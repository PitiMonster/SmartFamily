const express = require("express");
const familyController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");
const budgetRouter = require("../Budget/routes");

const router = express.Router();

router.use(authController.protect);

router.use("/:id/budgets", budgetRouter);

router
  .route("/")
  .get(familyController.getFamilies)
  .post(familyController.createFamily);

router
  .route("/:id")
  .get(permissionController.isFamilyMember, familyController.getOneFamily);

module.exports = router;
