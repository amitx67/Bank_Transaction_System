const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required for creating a user."],
    trim: true,
    lowercase: true,
    match: [emailRegex, "Please provide a valid email address"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Name is required for creating a user."],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required for creating an account"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false
  }
}, {
  timestamps: true
});

// Async Mongoose middleware: do not use next() with this promise-based hook.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
