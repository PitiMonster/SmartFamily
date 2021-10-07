const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const ShoppingItem = require("../ShoppingItem/model");
const Family = require("../Family/model");
const shoppingItemController = require("../ShoppingItem/controller");

describe("ShoppingItem Controller ", () => {
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
        return ShoppingItem.create({
          name: "Test shoppingItem",
          uniqueName: "5c0f66b979af55031b34728aTest shoppingItem",
          authorName: "TestTest",
          count: 12,
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          shoppingList: ["5c0f66b979af55031b34728c"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getShoppingItems returns list of family shopping items", (done) => {
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
    shoppingItemController
      .getShoppingItems(req, res, () => {})
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

  it("Test if createShoppingItem add newShoppingItem to family shoppingList", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728a",
      },
      user: {
        name: "Test",
        surname: "Test",
      },
      body: {
        name: "Test shoppingItem create",
        count: 12,
        description: null,
      },
      family: {
        _id: "5c0f66b979af55031b34728a",
        shoppingList: [],
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
    shoppingItemController
      .createShoppingItem(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(201);
        expect(response.status).to.be.equal("success");
        expect(req.family.shoppingList.length).to.be.equal(1);
        expect(response.data._id.toString()).to.be.equal(
          req.family.shoppingList[0]._id.toString()
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test getOneShoppingItem", (done) => {
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
    shoppingItemController
      .getOneShoppingItem(req, res, () => {})
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
      .then(() => ShoppingItem.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
