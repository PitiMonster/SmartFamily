const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const CalendarEvent = require("../CalendarEvent/model");
const Family = require("../Family/model");
const calendarEventController = require("../CalendarEvent/controller");

describe("CalendarEvent Controller ", () => {
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
        return CalendarEvent.create({
          name: "Test calendar event",
          uniqueName: "5c0f66b979af55031b34728aTest calendar event",
          date: "12/12/2021",
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          calendarEvents: ["5c0f66b979af55031b34728c"],
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getCalendarEvents returns list of family calendar events", (done) => {
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
    calendarEventController
      .getCalendarEvents(req, res, () => {})
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

  it("Test if createCalendarEvent add newCalendarEvent to family calendar events", (done) => {
    const req = {
      params: {
        familyId: "5c0f66b979af55031b34728a",
      },
      body: {
        name: "Test calendarEvent create",
        date: "12/12/2021",
      },
      family: {
        _id: "5c0f66b979af55031b34728a",
        calendarEvents: [],
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
    calendarEventController
      .createCalendarEvent(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(201);
        expect(response.status).to.be.equal("success");
        expect(req.family.calendarEvents.length).to.be.equal(1);
        expect(response.data._id.toString()).to.be.equal(
          req.family.calendarEvents[0]._id.toString()
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test getOneCalendarEvent", (done) => {
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
    calendarEventController
      .getCalendarEvent(req, res, () => {})
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
      .then(() => CalendarEvent.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
