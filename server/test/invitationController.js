const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Invitation = require("../Invitation/model");
const Family = require("../Family/model");
const User = require("../User/model");
const invitationController = require("../Invitation/controller");

describe("Invitation Controller ", () => {
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
        return Invitation.create({
          family: "5c0f66b979af55031b34728a",
          sender: "5c0f66b979af55031b34728d",
          receiver: "5c0f66b979af55031b34728e",
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          members: ["5c0f66b979af55031b34728d"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        return User.create({
          email: "test@test.com",
          name: "testSender",
          surname: "tester",
          sex: "male",
          role: "parent",
          families: ["5c0f66b979af55031b34728a"],
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728d",
        });
      })
      .then(() => {
        return User.create({
          email: "test@test1.com",
          name: "testReceiverInvited",
          surname: "tester",
          sex: "male",
          role: "child",
          families: [],
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728e",
        });
      })
      .then(() => {
        return User.create({
          email: "test@test2.com",
          name: "testReceiverNotInvited",
          surname: "tester",
          sex: "male",
          role: "parent",
          families: [],
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728f",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getInvitations returns list of user invitations", (done) => {
    const req = {
      user: {
        id: "5c0f66b979af55031b34728e",
      },
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
    invitationController
      .getInvitations(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data).to.be.an("array");
        expect(response.data[0]._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728c"
        );

        done();
      })
      .catch((err) => console.log(err));
  });
  describe("Test createInvitation", () => {
    it("Test invitation sender must be parent", (done) => {
      const req = {
        user: {
          role: "child",
        },
        body: {
          receiver: "",
          family: "",
        },
      };
      const next = (err) => err;
      invitationController
        .createInvitation(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(403);
          expect(res.message).to.equal(
            "Only parent is permitted to create invitation!"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test incorrect receiver id error", (done) => {
      const req = {
        user: {
          role: "parent",
        },
        body: {
          receiver: "615f683387627405f4464d8a",
          family: "615f683387627405f4464d8a",
        },
      };
      const next = (err) => err;
      invitationController
        .createInvitation(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal("No receiver found with provided id");
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test incorrect family id error", (done) => {
      const req = {
        user: {
          role: "parent",
        },
        body: {
          receiver: "5c0f66b979af55031b34728e",
          family: "615f683387627405f4464d8a",
        },
      };
      const next = (err) => err;
      invitationController
        .createInvitation(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal("No family found with provided id");
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test user is already invited to this family", (done) => {
      const req = {
        user: {
          role: "parent",
        },
        body: {
          receiver: "5c0f66b979af55031b34728e",
          family: "5c0f66b979af55031b34728a",
        },
      };
      const next = (err) => err;
      invitationController
        .createInvitation(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(400);
          expect(res.message).to.equal(
            "This user is already invited to this family!"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test sender must be a member of family", (done) => {
      const req = {
        user: {
          role: "parent",
          id: "5c0f66b979af55031b34728e",
        },
        body: {
          receiver: "5c0f66b979af55031b34728f",
          family: "5c0f66b979af55031b34728a",
        },
      };
      const next = (err) => err;
      invitationController
        .createInvitation(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(403);
          expect(res.message).to.equal("You are not a member of this family!");
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test receiver must not be a member of family", (done) => {
      const req = {
        user: {
          role: "parent",
          id: "5c0f66b979af55031b34728d",
        },
        body: {
          receiver: "5c0f66b979af55031b34728d",
          family: "5c0f66b979af55031b34728a",
        },
      };
      const next = (err) => err;
      invitationController
        .createInvitation(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(400);
          expect(res.message).to.equal(
            "Invited user is already a member of this family"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test receiver gets new invitation", (done) => {
      const req = {
        user: {
          role: "parent",
          id: "5c0f66b979af55031b34728d",
        },
        body: {
          receiver: "5c0f66b979af55031b34728f",
          family: "5c0f66b979af55031b34728a",
        },
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
      invitationController
        .createInvitation(req, res, () => {})
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response).to.has.property("status");
          expect(response).to.has.property("data");
          expect(response.statusCode).to.be.equal(201);
          expect(response.status).to.be.equal("success");
          expect(response.data).to.has.property("_id");

          User.findById(req.body.receiver)
            .populate("myInvitations")
            .then((user) => {
              expect(user.myInvitations).to.be.an("array");
              expect(user.myInvitations.length).to.be.equal(1);
              expect(user.myInvitations[0]).to.has.property("_id");
              expect(user.myInvitations[0]._id.toString()).to.equal(
                response.data._id.toString()
              );
              done();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  });

  describe("Test responseToInvitation", () => {
    it("Test incorrect invtitation id provided error", (done) => {
      const req = {
        params: { response: "accept", id: "5c0f66b979af55031b34728a" },
      };
      const next = (err) => err;

      invitationController
        .responseToInvitation(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal("Invitation with that id not found!");
          done();
        })
        .catch((err) => console.log(err));
    });

    it("Test accept invitation", (done) => {
      const req = {
        params: { response: "accept", id: "5c0f66b979af55031b34728c" },
      };

      const res = {
        status: (val) => {
          return { statusCode: val };
        },
      };

      invitationController
        .responseToInvitation(req, res, () => {})
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response.statusCode).to.equal(204);

          Family.findById("5c0f66b979af55031b34728a")
            .populate("members")
            .then((family) => {
              expect(family).to.has.property("members");
              expect(family.members).to.be.an("array");
              expect(family.members.length).to.equal(2);
              expect(family.members[1]._id.toString()).to.equal(
                "5c0f66b979af55031b34728e"
              );
              return Invitation.findById(req.params.id);
            })
            .then((invitation) => {
              expect(invitation).to.be.a("null");

              return Invitation.create({
                family: "5c0f66b979af55031b34728a",
                sender: "5c0f66b979af55031b34728d",
                receiver: "5c0f66b979af55031b34728e",
                _id: "5c0f66b979af55031b34728c",
              });
            })
            .then(() => done())
            .catch((err) => console.log(err));
        });
    });
    it("Test reject invitation", (done) => {
      const req = {
        params: { response: "reject", id: "5c0f66b979af55031b34728c" },
      };

      const res = {
        status: (val) => {
          return { statusCode: val };
        },
      };

      invitationController
        .responseToInvitation(req, res, () => {})
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response.statusCode).to.equal(204);

          return Invitation.findById(req.params.id);
        })
        .then((invitation) => {
          expect(invitation).to.be.a("null");

          return Invitation.create({
            family: "5c0f66b979af55031b34728a",
            sender: "5c0f66b979af55031b34728d",
            receiver: "5c0f66b979af55031b34728e",
            _id: "5c0f66b979af55031b34728c",
          });
        })
        .then(() => done())
        .catch((err) => console.log(err));
    });
  });

  it("Test getOneInvitation", (done) => {
    const req = {
      params: {
        id: "5c0f66b979af55031b34728c",
      },
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
    invitationController
      .getOneInvitation(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728c"
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  after((done) => {
    Family.deleteMany()
      .then(() => Invitation.deleteMany())
      .then(() => User.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
