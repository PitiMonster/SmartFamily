const express = require("express");
const invitationController = require("./controller");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(invitationController.getInvitations)
  .post(invitationController.createInvitation);

router.route("/:id").get(invitationController.getOneInvitation);

module.exports = router;
