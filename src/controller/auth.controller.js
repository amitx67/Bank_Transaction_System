const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

async function userRegisterController(req, res) {
  try {
    const { email, password, name } = req.body || {};

    if (
      typeof email !== "string" || !email.trim() ||
      typeof password !== "string" || !password ||
      typeof name !== "string" || !name.trim()
    ) {
      return res.status(400).json({
        message: "Name, email, and password are required",
        status: "failed"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        status: "failed"
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from the environment");
      return res.status(500).json({
        message: "Server configuration error",
        status: "failed"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isExists = await userModel.findOne({ email: normalizedEmail });

    if (isExists) {
      return res.status(422).json({
        message: "User already exists with the same email",
        status: "failed"
      });
    }

    // The User model hashes the password in its pre-save middleware.
    const user = await userModel.create({
      email: normalizedEmail,
      password,
      name: name.trim()
    });

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    // Handle duplicate email writes that race past the initial lookup.
    if (error && error.code === 11000) {
      return res.status(422).json({
        message: "User already exists with the same email",
        status: "failed"
      });
    }

    if (error && error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
        status: "failed"
      });
    }

    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: "failed"
    });
  }
}

module.exports = { userRegisterController };
