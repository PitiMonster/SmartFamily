const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Task = require("../Task/model");
const Family = require("../Family/model");
const User = require("../User/model");
const taskController = require("../Task/controller");

describe("Task Controller ", () => {
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
        return Task.create({
          name: "Test exercise",
          uniqueName: "5c0f66b979af55031b34728aTest exercise",
          completionDate: "12/12/2021",
          points: 12,
          principal: "5c0f66b979af55031b34728d",
          contractor: "5c0f66b979af55031b34728e",
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          tasks: ["5c0f66b979af55031b34728c"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        return User.create({
          email: "test@test.com",
          name: "testParent",
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
          name: "testChild",
          surname: "tester",
          sex: "male",
          role: "child",
          families: ["5c0f66b979af55031b34728a"],
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728e",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getTasks returns list of family tasks", (done) => {
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
    taskController
      .getTasks(req, res, () => {})
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
  describe("Test createTask", () => {
    it("Test incorrect contractor id (not user found) error", (done) => {
      const req = {
        body: {
          name: "Test exercise create",
          completionDate: "12/12/2021",
          points: 12,
          contractor: "5c0f66b979af55031b34728f",
          description: null,
        },
      };
      const next = (err) => err;

      taskController
        .createTask(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(400);
          expect(res.message).to.equal("Task contractor can be child only!");
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test parent cannot be task contractor error", (done) => {
      const req = {
        body: {
          name: "Test exercise create",
          completionDate: "12/12/2021",
          points: 12,
          contractor: "5c0f66b979af55031b34728d",
          description: null,
        },
      };
      const next = (err) => err;

      taskController
        .createTask(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(400);
          expect(res.message).to.equal("Task contractor can be child only!");
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test child cannot be task principal error", (done) => {
      const req = {
        body: {
          name: "Test exercise create",
          completionDate: "12/12/2021",
          points: 12,
          contractor: "5c0f66b979af55031b34728e",
          description: null,
        },
        user: {
          role: "child",
        },
      };
      const next = (err) => err;

      taskController
        .createTask(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(400);
          expect(res.message).to.equal("Task principal can be parent only!");
          done();
        })
        .catch((err) => console.log(err));
    });

    it("Test if createTask add newTask to family tasks", (done) => {
      const req = {
        params: {
          familyId: "5c0f66b979af55031b34728a",
        },
        body: {
          name: "Test exercise create",
          completionDate: "12/12/2021",
          points: 12,
          contractor: "5c0f66b979af55031b34728e",
          description: null,
        },
        user: {
          _id: "5c0f66b979af55031b34728d",
          role: "parent",
        },
        family: {
          _id: "5c0f66b979af55031b34728a",
          tasks: [],
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
      taskController
        .createTask(req, res, () => {})
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response).to.has.property("status");
          expect(response).to.has.property("data");
          expect(response.statusCode).to.be.equal(201);
          expect(response.status).to.be.equal("success");
          expect(req.family.tasks.length).to.be.equal(1);
          expect(response.data._id.toString()).to.be.equal(
            req.family.tasks[0]._id.toString()
          );

          done();
        })
        .catch((err) => console.log(err));
    });
  });

  it("Test getTask", (done) => {
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
    taskController
      .getTask(req, res, () => {})
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
      .then(() => Task.deleteMany())
      .then(() => User.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});