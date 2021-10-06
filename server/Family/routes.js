const express = require("express");
const familyController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");
const budgetRouter = require("../Budget/routes");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(familyController.getFamilies)
  .post(familyController.createFamily);

// check if user is member of requested family
router.use(permissionController.isFamilyMember);

router.use("/:id/budgets", budgetRouter);

router.route("/:id").get(familyController.getOneFamily);

module.exports = router;
