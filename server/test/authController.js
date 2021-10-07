const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const User = require("../User/model");
const authController = require("../controllers/authController");

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
        const user = new User({
          email: "test@test.com",
          name: "testes",
          surname: "tester",
          sex: "male",
          role: "parent",
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728a",
        });
        return user.save();
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
    const next = (err) => err;
    authController
      .signIn(reqEmail, {}, next)
      .then((result) => {
        expect(result).to.be.an("error");
        expect(result.message).to.be.equal("Please provide email and password");
        expect(result.statusCode).to.be.equal(400);
      })
      .then(() =>
        authController.signIn(reqPass, {}, next).then((result) => {
          expect(result).to.be.an("error");
          expect(result.message).to.be.equal(
            "Please provide email and password"
          );
          expect(result.statusCode).to.be.equal(400);
          done();
        })
      )
      .catch((err) => console.log(err));
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

    const next = (err) => err;
    authController
      .signIn(reqInvalidEmail, {}, next)
      .then((res) => {
        expect(res).to.be.an("error");
        expect(res.message).to.be.equal("Incorrect email or password provided");
        expect(res.statusCode).to.be.equal(401);
        return;
      })
      .then(() => authController.signIn(reqInvalidPassword, {}, next))
      .then((res) => {
        expect(res).to.be.an("error");
        expect(res.message).to.be.equal("Incorrect email or password provided");
        expect(res.statusCode).to.be.equal(401);
        done();
      });
  });

  it("Test no-authorization header", (done) => {
    const req = {
      headers: {},
    };

    const next = (err) => err;
    authController
      .protect(req, {}, next)
      .then((res) => {
        expect(res).to.be.an("error");
        expect(res.message).to.be.equal(
          "You are not logged in! Please log in to get access."
        );
        expect(res.statusCode).to.be.equal(401);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
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

  after((done) => {
    User.deleteMany()
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
