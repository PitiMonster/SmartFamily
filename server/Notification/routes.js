const express = require("express");
const notificationController = require("./controller");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route("/").get(notificationController.getNotifications);

module.exports = router;
