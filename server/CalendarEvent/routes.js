const express = require("express");
const calendarEventController = require("./controller");
const authController = require("../controllers/authController");
const permissionController = require("../controllers/permissionController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.use(permissionController.isFamilyMember);

router
  .route("/")
  .get(calendarEventController.getCalendarEvents)
  .post(calendarEventController.createCalendarEvent);

router.route("/:id").get(calendarEventController.getCalendarEvent);

module.exports = router;
