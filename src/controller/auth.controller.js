const userModel = require("../models/user.model")
const emailService = require("../services/email.service.js")
const jwt = require("jsonwebtoken")

/**
* - user register controller
* - POST /api/auth/register
*/
async function userRegisterController(req, res) {
    const { email, password, name } = req.body || {}

    if (!email || !password || !name) {
        return res.status(400).json({
            message: "Email, password, and name are required.",
            status: "failed"
        })
    }

    const isExists = await userModel.findOne({
        email: email.trim().toLowerCase()
    })

    if (isExists) {
        return res.status(422).json({
            message: "User already exists with email.",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email, password, name
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    emailService.sendRegistrationEmail(user.email, user.name).catch((err) => {
        console.error("Registration email failed:", err.message)
    })
}



/**
 * - User Login Controller
 * - POST /api/auth/login
  */

async function userLoginController(req, res) {
    const { email, password } = req.body || {}

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        })
    }

    const user = await userModel.findOne({ email: email.trim().toLowerCase() }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

}

async function userLogoutController(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    })

    return res.status(200).json({
        message: "Logged out successfully"
    })
}


module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController
}