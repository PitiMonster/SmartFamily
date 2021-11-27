const crypto = require("crypto");
const mongoose = require("mongoose");
const SHA256 = require("crypto-js/sha256");
const validator = require("validator");

const moment = require("moment");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    surname: {
      type: String,
      required: [true, "User surname is required"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    username: {
      type: String,
      required: [true, "User username is required"],
      unique: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "User sex is required"],
    },
    profilePhoto: {
      type: String,
    },
    role: {
      type: String,
      enum: ["parent", "child"],
      default: "parent",
    },
    birthDate: {
      type: Date,
      required: [true, "User birth date is required"],
      validate: {
        validator: function (val) {
          if (this.role === "parent") {
            const diffYears = moment(Date.now()).diff(val, "years");
            return diffYears >= 18;
          }
        },
        message: "The parent must be at least 18 years of age",
      },
    },
    families: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Family",
        default: [],
      },
    ],
    notifications: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Notification",
        default: [],
      },
    ],
    purchasedRewards: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Reward",
        default: [],
      },
    ],
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    pointsCount: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm is required"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password confirmation differs from password",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    parentCode: String,
    attemptsLeft: {
      type: Number,
      default: 3,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    isNewUser: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "child",
});

userSchema.virtual("invitations", {
  ref: "Invitation",
  localField: "_id",
  foreignField: "receiver",
});

// encrypt the user's password with SHA256 algorithm
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = SHA256(this.password);
  this.passwordConfirm = undefined;
  next();
});

// check if user's password is equal provided password
userSchema.methods.correctPassword = (providedPassword, userPassword) =>
  SHA256(providedPassword).toString() === userPassword;

// check if provided JWT was not generated before password change
userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime(), 10);
    return JWTTimestamp < changedTimestamp;
  }
  // false means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // expiration time for 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
