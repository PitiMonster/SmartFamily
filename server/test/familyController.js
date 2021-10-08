const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const User = require("../User/model");
const Family = require("../Family/model");
const Chat = require("../Chat/model");
const familyController = require("../Family/controller");

describe("Reward Controller ", () => {
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
          families: ["5c0f66b979af55031b34728a"],
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          members: ["5c0f66b979af55031b34728c"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getFamilies returns list of user families", (done) => {
    const req = {
      user: {
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
    familyController
      .getFamilies(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data).to.be.an("array");
        expect(response.data[0]._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728a"
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if createFamily add newFamily to user families", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728a",
      },
      body: {
        name: "Test reward create",
        photo: null,
      },
      user: {
        _id: "5c0f66b979af55031b34728c",
        families: [],
        save: () => {},
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
    familyController
      .createFamily(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(201);
        expect(response.status).to.be.equal("success");
        expect(req.user.families.length).to.be.equal(1);
        expect(response.data._id.toString()).to.be.equal(
          req.user.families[0]._id.toString()
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test getOneFamily", (done) => {
    const req = {
      params: {
        id: "5c0f66b979af55031b34728a",
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
    familyController
      .getOneFamily(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728a"
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  after((done) => {
    Family.deleteMany()
      .then(() => User.deleteMany())
      .then(() => Chat.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
