const express = require("express");
const familyController = require("./controller");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(familyController.getFamilies)
  .post(familyController.createFamily);

router.route("/:id").get(familyController.getOneFamily);

module.exports = router;
