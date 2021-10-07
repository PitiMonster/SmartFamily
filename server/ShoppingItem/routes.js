const express = require("express");
const shoppingItemController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.use(permissionController.isFamilyMember);

router
  .route("/")
  .get(shoppingItemController.getShoppingItems)
  .post(shoppingItemController.createShoppingItem);

router.route("/:id").get(shoppingItemController.getOneShoppingItem);

module.exports = router;
