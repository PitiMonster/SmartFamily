const express = require("express");
const rewardController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.use(permissionController.isFamilyMember);

router
  .route("/")
  .get(rewardController.getRewards)
  .post(authController.restrictTo("parent"), rewardController.createReward);

router.route("/:id").get(rewardController.getReward);
router.route("/:id/buy").delete();

module.exports = router;
