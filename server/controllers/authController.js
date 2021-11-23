const jwt = require("jsonwebtoken");
const User = require("./../User/model");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Email = require("./../utils/email");
const crypto = require("crypto");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;
  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.checkEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    return next(new AppError("Provided email is already in use", 400));
  }

  res.status(200).json({ status: "success" });
});

exports.checkUsername = catchAsync(async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({ username: username });

  if (user) {
    return next(new AppError("Provided username is already in use", 400));
  }

  res.status(200).json({ status: "success" });
});

exports.signUp = catchAsync(async (req, res, next) => {
  const {
    name,
    surname,
    username,
    email,
    role,
    birthDate,
    sex,
    profilePhoto,
    password,
    passwordConfirm,
  } = req.body;

  const active = role === "parent";

  const newUser = await User.create({
    name,
    surname,
    username,
    email,
    role,
    birthDate,
    sex,
    profilePhoto,
    password,
    passwordConfirm,
    active,
  });

  if (role === "parent") {
    const url = `${req.protocol}://${req.get("host")}/me`;
    // console.log(url);
    await new Email(newUser, url).sendWelcome();
    res.status(201).json({ status: "success", data: {} });
  } else {
    res.status(201).json({ status: "success", data: newUser });
  }
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password provided
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email: email })
    .select("+password +active")
    .populate({
      path: "families",
      select: "name photo chat",
    });

  if (!user || !user.correctPassword(password, user.password)) {
    return next(new AppError("Incorrect email or password provided", 401));
  }
  if (!user.active) {
    return next(
      new AppError(
        "Your account is not vierified. Verify your account by clicking the link sent to you in the email",
        400
      )
    );
  }

  createAndSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Check if token provided in headers
  let token;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verificate token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3 Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does not longer exists",
        401
      )
    );
  }
  // 4) Check if usser changed password afte the token was issued
  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        "User has changed the password recenly! Plase log in again",
        401
      )
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to this action.", 403)
      );
    }
    return next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://127.0.0.1:3000/auth/reset-password/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    return res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  console.log(req.params.id);
  console.log(req.body.password);
  console.log(req.body.passwordConfirm);
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Password reset successfully!",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  return res.status(200).json({ status: "success", data: {} });
});

exports.sendAcceptChildCodeToParent = catchAsync(async (req, res, next) => {
  const { email, childFullName } = req.body;

  const user = await User.findOne({ email, role: "parent" });

  if (!user) {
    return next(
      new AppError("No parent found with provided email address", 404)
    );
  }

  const parentCode = (((Math.random() * 1000000) | 0) + "").padStart(6, "0");

  user.parentCode = parentCode;
  user.save({ validateBeforeSave: false });

  const emailData = {
    childFullName,
    parentCode,
  };
  await new Email(user, "", emailData).sendChildCodeToParent();

  return res.status(200).json({ status: "success" });
});

exports.verifyChildCodeToParent = catchAsync(async (req, res, next) => {
  const { childCode, childId, parentEmail } = req.body;

  const parent = await User.findOne({ email: parentEmail, role: "parent" });
  const child = await User.findOne({ _id: childId, active: false });
  console.log(childId);
  if (!parent) {
    return next(
      new AppError("No parent found with provided email address", 404)
    );
  }
  if (!child) {
    return next(
      new AppError("No not verified child found with provided id", 404)
    );
  }
  if (parent.parentCode !== childCode) {
    parent.attemptsLeft -= 1;
    if (parent.attemptsLeft === 0) {
      const parentCode = (((Math.random() * 1000000) | 0) + "").padStart(
        6,
        "0"
      );

      parent.parentCode = parentCode;
      parent.attemptsLeft = 3;
      parent.save({ validateBeforeSave: false });

      const emailData = {
        childFullName: `${child.name} ${child.surname}`,
        parentCode,
      };
      await new Email(parent, "", emailData).sendChildCodeToParent();

      return next(
        new AppError("Wrong code provided. New code sent to your email", 400)
      );
    } else {
      await parent.save({ validateBeforeSave: false });
      return next(
        new AppError(
          `Wrong code provided. ${parent.attemptsLeft} attempts left`,
          400
        )
      );
    }
  }
  parent.parentCode = "";
  parent.attemptsLeft = 3;
  child.parent = parent._id;
  child.active = true;
  await parent.save({ validateBeforeSave: false });
  await child.save({ validateBeforeSave: false });
  return res.status(200).json({ status: "success", data: child });
});
