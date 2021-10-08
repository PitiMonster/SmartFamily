const express = require("express");
const taskController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.use(permissionController.isFamilyMember);

router.route("/").get(taskController.getTasks).post(taskController.createTask);

router.route("/:id").get(taskController.getTask);

module.exports = router;
