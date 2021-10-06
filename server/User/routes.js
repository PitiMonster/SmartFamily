const express = require("express");
const userController = require("./controller");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/forgotPassword");
router.patch("/resetPassword/:token");

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
router.patch("/updatePassword");

// router.use(authController.restrictTo('admin'))

// router.route('/').post(userController.createUser);

router.route("/:id").get(userController.getUser);
//   .patch(userController.filterFieldsToUpdate, userController.updateUser);
//   .delete(userController.deleteUser);

module.exports = router;
