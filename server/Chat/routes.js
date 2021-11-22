const express = require("express");
const chatController = require("./controller");
const authController = require("./../controllers/authController");
const permissionController = require("./../controllers/permissionController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(chatController.getAllChats);

// get chat
router
  .route("/:id")
  .get(permissionController.isChatMember, chatController.getChat);

router
  .route("/:id/readChat")
  .patch(permissionController.isChatMember, chatController.readChat);

module.exports = router;
