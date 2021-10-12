const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Budget = require("../Budget/model");
const Family = require("../Family/model");
const budgetController = require("../Budget/controller");

describe("Budget Controller ", () => {
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
        return Budget.create({
          name: "Test budget",
          uniqueName: "5c0f66b979af55031b34728aTest budget",
          budgetValue: 5,
          renewalDate: "12/12/2021",
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          budgets: ["5c0f66b979af55031b34728c"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getBudgets returns list of family budgets", (done) => {
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
    budgetController
      .getBudgets(req, res, () => {})
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

  it("Test if createBudget add newBudget to family budgets", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728a",
      },
      body: {
        name: "Test budget create",
        budgetValue: 1,
        renewalDate: null,
      },
      family: {
        _id: "5c0f66b979af55031b34728a",
        budgets: [],
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
    budgetController
      .createBudget(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(201);
        expect(response.status).to.be.equal("success");
        expect(req.family.budgets.length).to.be.equal(1);
        expect(response.data._id.toString()).to.be.equal(
          req.family.budgets[0]._id.toString()
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test getOneBudget", (done) => {
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
    budgetController
      .getOneBudget(req, res, () => {})
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

  describe("Test addExpenseToBudget", () => {
    it("Test incorrect budget id provided error", (done) => {
      const req = {
        body: { name: "test expense", price: 1, description: null },
        params: {
          id: "5c0f66b979af55031b34728a",
        },
      };

      const next = (err) => err;

      budgetController
        .addExpenseToBudget(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.message).to.equal("Budget with provided ID not found!");
          expect(res.statusCode).to.equal(404);

          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test if expense added to budget", (done) => {
      const req = {
        body: { name: "test expense", price: 1, description: null },
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
      budgetController
        .addExpenseToBudget(req, res, () => {})
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response).to.has.property("status");
          expect(response).to.has.property("data");
          expect(response.statusCode).to.be.equal(201);
          expect(response.status).to.be.equal("success");
          expect(response.data).to.has.property("expenses");
          expect(response.data.expenses).to.be.an("array");
          expect(response.data.expenses.length).to.equal(1);
          expect(response.data.expenses[0].name).to.equal(req.body.name);

          done();
        })
        .catch((err) => console.log(err));
    });
  });

  after((done) => {
    Family.deleteMany()
      .then(() => Budget.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
