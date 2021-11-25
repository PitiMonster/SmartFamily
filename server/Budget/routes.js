const express = require("express");
const budgetController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.use(permissionController.isFamilyMember);

router
  .route("/")
  .get(budgetController.getBudgets)
  .post(budgetController.createBudget);

router
  .route("/:id")
  .get(budgetController.getOneBudget)
  .post(budgetController.addExpenseToBudget)
  .patch(budgetController.updateBudget);

module.exports = router;
