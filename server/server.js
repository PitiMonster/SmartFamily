"use strict";
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// const runSockets = require("./Websockets");W

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

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
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

// Constants
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
// runSockets(server);
