const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty."],
    },
    email: {
      type: String,
      required: [true, "Email can not be empty."],
      unique: true,
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone can not be empty."],
      unique: true,
      select: false,
    },
    password: {
      type: String,
      required: [true, "Password can not be empty."],
      minLength: [8, "Password must be at least 8 characters."],
      select: false,
    },
    type: {
      type: String,
      default: "partner",
    },
    delivcosts: [
      {
        area: {
          type: String,
          required: true,
        },
        cost: {
          type: Number,
          required: true,
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    active: {
      type: Boolean,
      default: true,
    },
    alertsLeft: {
      type: Number,
      default: 0,
    },
    country: { type: String, default: "IN" },
    state: { type: String, required: [true, "State is missing."] },
    city: { type: String, required: [true, "City is missing."] },
  },
  {
    timestamps: true,
  }
);
partnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
});
partnerSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id, type: this.type },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

//Compare Password
partnerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Generating Password Reset Token
partnerSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports =
  mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
