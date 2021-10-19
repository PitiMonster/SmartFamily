const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const User = require("../User/model");
const userController = require("../User/controller");

describe("User Controller ", () => {
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
          name: "test",
          surname: "tester",
          username: "test1",
          birthDate: "06/03/1999",
          sex: "male",
          role: "parent",
          families: ["5c0f66b979af55031b34728a"],
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728d",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test getMe", () => {
    const req = {
      user: {
        id: "5c0f66b979af55031b34728d",
      },
      params: {},
    };
    userController.getMe(req, {}, () => {});

    expect(req.params).has.property("id");
    expect(req.params.id).to.equal("5c0f66b979af55031b34728d");
  });

  it("Test filterFieldsToUpdate", () => {
    const req = {
      body: {
        name: "name",
        surname: "surname",
        profilePhoto: "photo",
        test1: "test",
        test2: "test",
      },
    };

    const expectedBody = {
      name: "name",
      surname: "surname",
      profilePhoto: "photo",
    };

    userController.filterFieldsToUpdate(req, {}, () => {});
    expect(req.body).to.deep.equal(expectedBody);
  });

  it("Test getUser", (done) => {
    const req = {
      params: {
        id: "5c0f66b979af55031b34728d",
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
    userController
      .getUser(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728d"
        );

        done();
      })
      .catch((err) => console.log(err));
  });
  it("Test getAllUsers", (done) => {
    const req = {
      params: {
        id: "5c0f66b979af55031b34728d",
      },
      query: {},
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

    userController
      .getAllUsers(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data).to.be.an("array");
        expect(response.data.length).to.equal(1);
        expect(response.data[0]._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728d"
        );

        done();
      })
      .catch((err) => console.log(err));
  });
  it("Test updateUser", (done) => {
    const req = {
      body: {
        name: "updated name",
        surname: "updated surname",
        profilePhoto: "updated profile photo",
      },
      params: {
        id: "5c0f66b979af55031b34728d",
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

    userController
      .updateUser(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728d"
        );
        expect(response.data.name).to.equal(req.body.name);
        expect(response.data.surname).to.equal(req.body.surname);
        expect(response.data.profilePhoto).to.equal(req.body.profilePhoto);

        done();
      })
      .catch((err) => console.log(err));
  });

  after((done) => {
    User.deleteMany()
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
