const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const User = require("../User/model");
const Family = require("../Family/model");
const permissionController = require("../controllers/permissionController");

describe("Permission Controller ", () => {
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
          sex: "male",
          role: "parent",
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          members: ["5c0f66b979af55031b34728a"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if wrong family object id returns error", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728b",
      },
    };
    const next = (err) => err;

    // sinon.stub(jwt, "verify");
    // jwt.verify.returns({ id: "5c0f66b979af55031b34728a", iat: Date.now() });

    permissionController
      .isFamilyMember(req, {}, next)
      .then((res) => {
        expect(res).to.be.an("error");
        expect(res.message).to.be.equal("Family with that ID does not exist");
        expect(res.statusCode).to.be.equal(404);
        // jwt.verify.restore();
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test user is not family member error", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728c",
      },
      user: {
        id: "5c0f66b979af55031b34728d",
      },
    };

    const next = (err) => err;

    permissionController.isFamilyMember(req, {}, next).then((res) => {
      expect(res).to.be.an("error");
      expect(res.message).to.be.equal(
        "You do not have permission to access this data"
      );
      expect(res.statusCode).to.be.equal(403);
      done();
    });
  });

  it("Test if req.family exists if family id is correct and user belongs to that family", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728c",
      },
      user: {
        id: "5c0f66b979af55031b34728a",
      },
    };
    permissionController
      .isFamilyMember(req, {}, () => {})
      .then(() => {
        expect(req).to.has.property("family");
        expect(req.family._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728c"
        );
        done();
      });
  });

  it("Test if next function resolves in proper way", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728c",
      },
      user: {
        id: "5c0f66b979af55031b34728a",
      },
    };
    const next = () => "correct";
    permissionController.isFamilyMember(req, {}, next).then((res) => {
      expect(res).to.be.equal("correct");
      done();
    });
  });

  after((done) => {
    User.deleteMany()
      .then(() => Family.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
