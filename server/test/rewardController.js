const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Reward = require("../Reward/model");
const Family = require("../Family/model");
const User = require("../User/model");
const Notification = require("../Notification/model");
const rewardController = require("../Reward/controller");

describe("Reward Controller ", () => {
  let user;

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
        return Reward.create({
          name: "Test reward",
          uniqueName: "5c0f66b979af55031b34728aTest reward",
          points: 12,
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          rewards: ["5c0f66b979af55031b34728c"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(async () => {
        user = await User.create({
          email: "test@test.com",
          name: "test",
          surname: "tester",
          username: "test1",
          birthDate: "06/03/1999",
          sex: "male",
          role: "child",
          pointsCount: 20,
          families: ["5c0f66b979af55031b34728a"],
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728d",
        });
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getRewards returns list of family rewards", (done) => {
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
    rewardController
      .getRewards(req, res, () => {})
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

  it("Test error: only parent is permitted to create reward", (done) => {
    const req = {
      body: {
        name: "Test reward create",
        photo: null,
        points: 12,
        description: null,
      },
      user: {
        role: "child",
      },
    };

    const next = (err) => err;

    rewardController
      .createReward(req, {}, next)
      .then((res) => {
        expect(res).to.be.an("error");
        expect(res).to.has.property("statusCode");
        expect(res).to.has.property("message");
        expect(res.message).to.equal(
          "Only parent member is permitted to create reward!"
        );
        expect(res.statusCode).to.equal(403);
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if createRewards add newReward to family rewards", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728a",
      },
      body: {
        name: "Test reward create",
        photo: null,
        points: 12,
        description: null,
      },
      family: {
        _id: "5c0f66b979af55031b34728a",
        rewards: [],
        save: () => {},
      },
      user: {
        role: "parent",
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
    rewardController
      .createReward(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(201);
        expect(response.status).to.be.equal("success");
        expect(req.family.rewards.length).to.be.equal(1);
        expect(response.data._id.toString()).to.be.equal(
          req.family.rewards[0]._id.toString()
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test getReward", (done) => {
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
    rewardController
      .getReward(req, res, () => {})
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

  describe("Test purchaseReward", () => {
    it("Test error: Only child is permitted to buy reward!", (done) => {
      const req = {
        params: {
          id: "",
        },
        user: {
          role: "parent",
        },
      };
      const next = (err) => err;

      rewardController
        .purchaseReward(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(403);
          expect(res.message).to.equal(
            "Only child is permitted to buy reward!"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test error: No reward document found with provided id", (done) => {
      const req = {
        params: {
          id: "5c0f66b979af55031b34728a",
        },
        user: {
          role: "child",
        },
      };
      const next = (err) => err;

      rewardController
        .purchaseReward(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal(
            "No reward document found with provided id"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test error: You do not have enough points to purchase this reward!", (done) => {
      const req = {
        params: {
          id: "5c0f66b979af55031b34728c",
        },
        user: {
          role: "child",
          pointsCount: 0,
        },
      };
      const next = (err) => err;

      rewardController
        .purchaseReward(req, {}, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(400);
          expect(res.message).to.equal(
            "You do not have enough points to purchase this reward!"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test reward purchased correctly", (done) => {
      const req = {
        params: {
          id: "5c0f66b979af55031b34728c",
        },
        user,
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

      rewardController
        .purchaseReward(req, res, () => {})
        .then((response) => {
          expect(response).to.has.property("statusCode");
          expect(response).to.has.property("status");
          expect(response).to.has.property("data");
          expect(response.statusCode).to.be.equal(200);
          expect(response.status).to.be.equal("success");
          expect(response.data._id.toString()).to.equal(req.params.id);

          return User.findById(user._id);
        })
        .then((user) => {
          expect(user.pointsCount).to.equal(8);
          expect(user.purchasedRewards.length).to.equal(1);
          expect(user.purchasedRewards[0]._id.toString()).to.equal(
            req.params.id
          );

          user.ponitsCountr = 20;
          user.purchasedRewards = [];
          return user.save({ validateBeforeSave: false });
        })
        .then(() => done())
        .catch((err) => console.log(err));
    });
  });

  after((done) => {
    Family.deleteMany()
      .then(() => Reward.deleteMany())
      .then(() => User.deleteMany())
      .then(() => Notification.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
