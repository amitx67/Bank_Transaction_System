const accountModel = require("../models/account.model")


async function createAccountController(req, res) {

    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }

        const account = await accountModel.create({
            user: user._id
        })

        return res.status(201).json({
            account
        })
    } catch (err) {
        console.error("Error creating account:", err.message)
        return res.status(500).json({
            message: "Unable to create account"
        })
    }

}

module.exports = {
    createAccountController

}
