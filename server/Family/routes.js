const express = require("express");
const familyController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");

const budgetRouter = require("../Budget/routes");
const calendarRouter = require("../CalendarEvent/routes");
const exerciseRouter = require("../Exercise/routes");
const rewardRouter = require("../Reward/routes");
const shoppingItemRouter = require("../ShoppingItem/routes");

const router = express.Router();

router.use(authController.protect);

router.use("/:familyId/budgets", budgetRouter);
router.use("/:familyId/calendar", calendarRouter);
router.use("/:familyId/exercises", exerciseRouter);
router.use("/:familyId/rewards", rewardRouter);
router.use("/:familyId/shopping", shoppingItemRouter);

router
  .route("/")
  .get(familyController.getFamilies)
  .post(familyController.createFamily);

router
  .route("/:id")
  .get(permissionController.isFamilyMember, familyController.getOneFamily);

module.exports = router;
