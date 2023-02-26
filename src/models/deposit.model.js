const mongoose = require('mongoose')
const Schema = mongoose.Schema

const depositSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    paymentMethod:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    proof:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "successful", "failed"],
        default: "pending"
    },
    createdAt: {
        type: Date, 
        default: Date.now(),
    }
})

module.exports = mongoose.model("Deposit", depositSchema)