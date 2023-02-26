const mongoose = require('mongoose')
const Schema = mongoose.Schema

const withdrawalSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    coin:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now(),
    }
})

module.exports = mongoose.model("Withdrawal", withdrawalSchema)