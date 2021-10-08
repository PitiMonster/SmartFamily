const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Exercise = require("../Exercise/model");
const Family = require("../Family/model");
const exerciseController = require("../Exercise/controller");

describe("Exercise Controller ", () => {
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
        return Exercise.create({
          name: "Test exercise",
          uniqueName: "5c0f66b979af55031b34728aTest exercise",
          completionDate: "12/12/2021",
          points: 12,
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          exercises: ["5c0f66b979af55031b34728c"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getExercises returns list of family exercises", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728a",
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
    exerciseController
      .getExercises(req, res, () => {})
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

  it("Test if createExercise add newExercise to family exercises", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728a",
      },
      body: {
        name: "Test exercise create",
        completionDate: "12/12/2021",
        points: 12,
        description: null,
      },
      family: {
        _id: "5c0f66b979af55031b34728a",
        exercises: [],
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
    exerciseController
      .createExercise(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(201);
        expect(response.status).to.be.equal("success");
        expect(req.family.exercises.length).to.be.equal(1);
        expect(response.data._id.toString()).to.be.equal(
          req.family.exercises[0]._id.toString()
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test getExercise", (done) => {
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
    exerciseController
      .getExercise(req, res, () => {})
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
      .then(() => Exercise.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
