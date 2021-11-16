const express = require("express");
const userController = require("./controller");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router.post("/signup/checkEmail", authController.checkEmail);

router.post("/childCode", authController.sendAcceptChildCodeToParent);
router.post("/verifyChildCode", authController.verifyChildCodeToParent);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.route("/").get(userController.getAllUsers);

router.use(authController.protect);

router
  .route("/me")
  .get(userController.getMe, userController.getUser)
  .patch(
    userController.getMe,
    userController.filterFieldsToUpdate,
    userController.updateUser
  )
  .delete(userController.getMe);

router.route("/updatePassword").patch(authController.updatePassword);

// router.use(authController.restrictTo('admin'))

// router.route('/').post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.filterFieldsToUpdate, userController.updateUser);
//   .delete(userController.deleteUser);

module.exports = router;
