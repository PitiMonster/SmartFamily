const express = require("express");
const budgetController = require("./controller");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(budgetController.getBudgets)
  .post(budgetController.createBudget);

router.route("/:id").get(budgetController.getOneBudget);

module.exports = router;
