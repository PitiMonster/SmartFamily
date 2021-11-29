"use strict";
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const temp = require("./backup.js");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const runSockets = require("./Websockets");
const runSchedulers = require("./utils/runSchedulers");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// GLOBAL UNCAUGHT ERROR HANLDERS

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED ERROR");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
temp();

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error(err);
    console.log("DB CONNECTION ERROR");
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// cloudinary.v2.api.resources(
//   {
//     type: "upload",
//     prefix: "SmartFamily/GroupPhotos", // add your folder
//   },
//   function (error, result) {
//     console.log(result, error);
//   }
// );

// Constants
const port = process.env.PORT || 8080;

const server = app.listen(port, async () => {
  await runSchedulers();
  console.log(`App running on port ${port}`);
});
runSockets(server);
