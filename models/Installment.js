import mongoose from "mongoose";

const installmentSchema = mongoose.Schema({
    stuId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    amount: {
        type: String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
}, { timestamps: true })

export default mongoose.models.installmentSchema || mongoose.model("installment",installmentSchema)