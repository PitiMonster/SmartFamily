const express = require("express");
const exerciseController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.use(permissionController.isFamilyMember);

router
  .route("/")
  .get(exerciseController.getExercises)
  .post(exerciseController.createExercise);

router.route("/:id").get(exerciseController.getExercise);

module.exports = router;
