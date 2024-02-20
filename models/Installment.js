import mongoose from "mongoose";

const installmentSchema = mongoose.Schema({
    stuId: {
        type: mongoose.Types.ObjectId,
        ref: "student",
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true })

export default mongoose.models.installment || mongoose.model("installment", installmentSchema)