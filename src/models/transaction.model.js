const mongoose = require("mongoose") 

const accountSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: account
    }

})



module.exports = accountSchema