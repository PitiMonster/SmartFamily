const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const SHA256 = require("crypto-js/sha256");

const User = require("../User/model");
const authController = require("../controllers/authController");

const testError = require("../utils/testError");

describe("Auth Controller ", () => {
  before((done) => {
    const DB = process.env.TEST_DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("BD CONNECTED SUCCESSFUL");
        return User.create({
          email: "test@test.com",
          name: "testes",
          surname: "tester",
          username: "test1",
          birthDate: "06/03/1999",
          sex: "male",
          role: "parent",
          password: "tester1234",
          passwordConfirm: "tester1234",
          childCode: "234567",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        return User.create({
          email: "test@child.com",
          name: "testes",
          surname: "tester",
          username: "child",
          birthDate: "06/03/1999",
          sex: "male",
          role: "child",
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728b",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test email and password have to be provided", (done) => {
    const reqEmail = {
      body: {
        email: "test@test.com",
      },
    };
    const reqPass = {
      body: {
        password: "test@test.com",
      },
    };

    testError(
      authController.signIn,
      reqEmail,
      400,
      "Please provide email and password",
      () => {}
    ).then(() =>
      testError(
        authController.signIn,
        reqPass,
        400,
        "Please provide email and password",
        done
      )
    );
  });

  it("Chcek if user exists and email and password are correct", (done) => {
    const reqInvalidEmail = {
      body: {
        email: "test@test1.com",
        password: "tester",
      },
    };
    const reqInvalidPassword = {
      body: {
        email: "test@test.com",
        password: "tester1",
      },
    };

    testError(
      authController.signIn,
      reqInvalidEmail,
      401,
      "Incorrect email or password provided",
      () => {}
    ).then(() =>
      testError(
        authController.signIn,
        reqInvalidPassword,
        401,
        "Incorrect email or password provided",
        done
      )
    );
  });

  it("Test no-authorization header", (done) => {
    const req = {
      headers: {},
    };

    testError(
      authController.protect,
      req,
      401,
      "You are not logged in! Please log in to get access.",
      done
    );
  });

  it("Test if jwt token is valid", (done) => {
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "not valid user id" });

    const req = {
      headers: {
        authorization: "Bearer token",
      },
    };
    const next = (err) => err;

    authController
      .protect(req, {}, next)
      .then((res) => {
        expect(res).to.be.an("error");
        expect(res.message).to.be.equal(
          "The user belonging to this token does not longer exists"
        );
        expect(res.statusCode).to.be.equal(401);
        jwt.verify.restore();
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Check if user is authorized with passwordChangedAt in future", (done) => {
    const req = {
      headers: {
        authorization: "Bearer 5c0f66b979af55031b34728a",
      },
    };
    const next = (err) => err;

    sinon.stub(jwt, "verify");
    jwt.verify.returns({ id: "5c0f66b979af55031b34728a", iat: Date.now() });

    User.findById("5c0f66b979af55031b34728a")
      .then((user) => {
        user.passwordChangedAt = new Date(Date.now() + 1000 * 60);
        return user.save({ validateBeforeSave: false });
      })
      .then(() => authController.protect(req, {}, next))
      .then((res) => {
        expect(res).to.be.an("error");
        expect(res.message).to.be.equal(
          "User has changed the password recenly! Plase log in again"
        );
        expect(res.statusCode).to.be.equal(401);
        jwt.verify.restore();
        return User.findById("5c0f66b979af55031b34728a");
      })
      .then((user) => {
        user.passwordChangedAt = undefined;
        return user.save({ validateBeforeSave: false });
      })
      .then(() => done())
      .catch((err) => console.log(err));
  });

  it("Check if proper execution of protect function set user property to req", (done) => {
    const req = {
      headers: {
        authorization: "Bearer 5c0f66b979af55031b34728a",
      },
    };
    const next = () => {};

    sinon.stub(jwt, "verify");
    jwt.verify.returns({ id: "5c0f66b979af55031b34728a", iat: Date.now() });

    authController
      .protect(req, {}, next)
      .then(() => {
        expect(req).to.has.property("user");
        jwt.verify.restore();
        done();
      })
      .catch((err) => console.log(err));
  });

  describe("Test restictTo controller", () => {
    it("Check if restrictTo function lock access properly", () => {
      const req = {
        user: {
          role: "tester",
        },
      };

      const response = authController.restrictTo("tester1", "tester2")(
        req,
        {},
        (err) => err
      );
      expect(response).to.be.an("error");
      expect(response.message).to.be.equal(
        "You do not have permission to this action."
      );
      expect(response.statusCode).to.be.equal(403);
    });

    it("Check if restrictTo give access to permitted users", () => {
      const req = {
        user: {
          role: "tester",
        },
      };

      const response = authController.restrictTo("tester1", "tester")(
        req,
        {},
        (err) => err ?? "correct"
      );
      expect(response).to.has.not.property("message");
      expect(response).to.be.equal("correct");
    });
  });

  describe("Test forgotPassword", () => {
    it("Test error: There is no  user with email address.", (done) => {
      const req = {
        body: {
          email: "incorrect@test.com",
        },
      };

      testError(
        authController.forgotPassword,
        req,
        404,
        "There is no user with email address.",
        done
      );
    });

    it("Test error: There was an error sending the email. Try again later!", (done) => {
      const req = {
        body: {
          email: "test@test.com",
        },
      };

      testError(
        authController.forgotPassword,
        req,
        500,
        "There was an error sending the email. Try again later!",
        done
      );
    });

    it("Test resetToken correct", (done) => {
      const req = {
        body: {
          email: "test@test.com",
        },
        protocol: "https://",
        get: () => "",
      };

      const res = {
        status: (val) => {
          return {
            json: (object) => {
              return { ...object, statusCode: val };
            },
          };
        },
      };

      authController
        .forgotPassword(req, res, () => {})
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response).to.has.property("status");
          expect(response).to.has.property("message");
          expect(response.statusCode).to.be.equal(200);
          expect(response.status).to.be.equal("success");
          expect(response.message).to.be.equal("Token sent to email!");
          done();
        })
        .catch((err) => console.log(err));
    });
  });

  describe("Test resetPassword", () => {
    it("Test error: Token is invalid or has expired", (done) => {
      const req = {
        params: {
          token: "test",
        },
      };
      testError(
        authController.resetPassword,
        req,
        400,
        "Token is invalid or has expired",
        done
      );
    });
  });

  describe("Test updatePassword", () => {
    it("Test error: Your current password is wrong.", (done) => {
      const req = {
        user: {
          id: "5c0f66b979af55031b34728a",
        },
        body: {
          passwordCurrent: "tester1234incorrect",
        },
      };

      testError(
        authController.updatePassword,
        req,
        401,
        "Your current password is wrong.",
        done
      );
    });
  });

  it("Test is password updated", (done) => {
    const req = {
      user: {
        id: "5c0f66b979af55031b34728a",
      },
      body: {
        passwordCurrent: "tester1234",
        password: "updatedpassword",
        passwordConfirm: "updatedpassword",
      },
      secure: true,
      headers: {
        "x-forwarded-proto": "https",
      },
    };

    const res = {
      cookie: () => {},
      status: (val) => {
        return {
          json: (object) => {
            return { ...object, statusCode: val };
          },
        };
      },
    };

    authController
      .updatePassword(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response).to.has.property("token");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data).to.has.property("user");
        expect(response.data.user._id.toString()).to.equal(req.user.id);

        return User.findById(req.user.id).select("+password");
      })
      .then((user) => {
        expect(user).to.to.has.property("password");
        expect(user.password).to.equal(SHA256(req.body.password).toString());
        done();
      })
      .catch((err) => console.log(err));
  });

  describe("Test sendAcceptChildCodeToParent", () => {
    it("Test error: No parent found with provided email address - wrong email", (done) => {
      const req = {
        body: { email: "wrongemail", childFullName: "Test Test" },
      };

      testError(
        authController.sendAcceptChildCodeToParent,
        req,
        404,
        "No parent found with provided email address",
        done
      );
    });
    it("Test error: No parent found with provided email address - wrong role", (done) => {
      const req = {
        body: { email: "test@test.com", childFullName: "Test Test" },
      };

      User.findById("5c0f66b979af55031b34728a")
        .then((user) => {
          user.role = "child";
          return user.save({ validateBeforeSave: false });
        })
        .then((user) => {
          return testError(
            authController.sendAcceptChildCodeToParent,
            req,
            404,
            "No parent found with provided email address",
            async () => {
              user.role = "parent";
              await user.save({ validateBeforeSave: false });
              done();
            }
          );
        })
        .catch((err) => console.log(err));
    });
    it("Test correct execution", (done) => {
      const req = {
        body: { email: "test@test.com", childFullName: "Test Test" },
      };

      const res = {
        cookie: () => {},
        status: (val) => {
          return {
            json: (object) => {
              return { ...object, statusCode: val };
            },
          };
        },
      };

      authController
        .sendAcceptChildCodeToParent(req, res, () => {})
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response).to.has.property("status");
          expect(response.statusCode).to.be.equal(200);
          expect(response.status).to.be.equal("success");

          done();
        })
        .catch((err) => console.log(err));
    });
  });

  describe("Test verifyChildCodeToParent", () => {
    it("Test error: No parent found with provided email address - incorrect email", (done) => {
      const req = {
        body: {
          childCode: "",
          parentEmail: "incorrecttest@test.com",
          childId: "5c0f66b979af55031b34728b",
        },
      };
      testError(
        authController.verifyChildCodeToParent,
        req,
        404,
        "No parent found with provided email address",
        done
      );
    });

    it("Test error: No parent found with provided email address - incorrect role", (done) => {
      const req = {
        body: {
          childCode: "",
          parentEmail: "test@child.com",
          childId: "5c0f66b979af55031b34728b",
        },
      };
      testError(
        authController.verifyChildCodeToParent,
        req,
        404,
        "No parent found with provided email address",
        done
      );
    });

    it("Test error: No child found with provided id - incorrect id", (done) => {
      const req = {
        body: {
          childCode: "",
          parentEmail: "test@test.com",
          childId: "5c0f66b979af55031b34728a",
        },
      };
      testError(
        authController.verifyChildCodeToParent,
        req,
        404,
        "No not verified child found with provided id",
        done
      );
    });
    it("Test error: No child found with provided id - is active", (done) => {
      const req = {
        body: {
          childCode: "",
          parentEmail: "test@test.com",
          childId: "5c0f66b979af55031b34728b",
        },
      };
      User.findById(req.body.childId)
        .then((user) => {
          user.active = true;
          return user.save({ validateBeforeSave: false });
        })
        .then((user) => {
          testError(
            authController.verifyChildCodeToParent,
            req,
            404,
            "No not verified child found with provided id",
            async () => {
              user.active = false;
              await user.save({ validateBeforeSave: false });
              done();
            }
          );
        });
    });
    it("Test error: Wrong code provided. New code sent to your email", (done) => {
      const req = {
        body: {
          childCode: "123456",
          parentEmail: "test@test.com",
          childId: "5c0f66b979af55031b34728b",
        },
      };
      User.findOne({ email: req.body.parentEmail })
        .then((user) => {
          user.attemptsLeft = 1;
          return user.save({ validateBeforeSave: false });
        })
        .then((user) => {
          testError(
            authController.verifyChildCodeToParent,
            req,
            400,
            "Wrong code provided. New code sent to your email",
            async () => {
              user.attemptsLeft = 3;
              await user.save({ validateBeforeSave: false });
              done();
            }
          );
        });
    });
    it("Test error: Wrong code provided. `Number` attempts left", (done) => {
      const req = {
        body: {
          childCode: "123456",
          parentEmail: "test@test.com",
          childId: "5c0f66b979af55031b34728b",
        },
      };

      testError(
        authController.verifyChildCodeToParent,
        req,
        400,
        "Wrong code provided. 2 attempts left",
        () => {}
      )
        .then(() => {
          return testError(
            authController.verifyChildCodeToParent,
            req,
            400,
            "Wrong code provided. 1 attempts left",
            () => {}
          );
        })
        .then(() => {
          return testError(
            authController.verifyChildCodeToParent,
            req,
            400,
            "Wrong code provided. New code sent to your email",
            done
          );
        });
    });

    it("Test correct execution", (done) => {
      const req = {
        body: {
          childCode: "234567",
          parentEmail: "test@test.com",
          childId: "5c0f66b979af55031b34728b",
        },
      };

      const res = {
        cookie: () => {},
        status: (val) => {
          return {
            json: (object) => {
              return { ...object, statusCode: val };
            },
          };
        },
      };

      User.findOne({ email: req.body.parentEmail })
        .then((user) => {
          user.parentCode = "234567";
          return user.save({ validateBeforeSave: false });
        })
        .then(() => {
          return authController.verifyChildCodeToParent(req, res, () => {});
        })
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response).to.has.property("status");
          expect(response).to.has.property("data");
          expect(response.statusCode).to.be.equal(200);
          expect(response.status).to.be.equal("success");
          expect(response.data._id.toString()).to.be.equal(req.body.childId);
          expect(response.data.parent.toString()).to.equal(
            "5c0f66b979af55031b34728a"
          );
          expect(response.data.active).to.equal(true);
          done();
        })
        .catch((err) => console.log(err));
    });
  });

  after((done) => {
    User.deleteMany()
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
