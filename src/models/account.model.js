const mongoose = require ("mongoose"); 

const accountSchema = new mongooseSchema ({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user",
        required: [true, "account must be associated with the user"],
        index: true
    },
    status: {
        enum: ["ACTIVE", "FROZEN", "CLOSED"],
        message: "status can be either active, frozen, closed"
    },
    currency: {
        type: String,
        required: [true, "currency is required for creating an account"],
        default: "INR"
    }
}, {
    timestamps: true
})

const accountModel = mongoose.model("account", accountSchema)

module.exports = accountModel 