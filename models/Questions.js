import mongoose from "mongoose";


const questionsSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    op1: {
        type: String,
        required: true
    },
    op2: {
        type: String,
        required: true
    },
    op3: {
        type: String,
        required: true
    },
    op4: {
        type: String,
        required: true
    },
    stuAns: {
        type: String,
        required: true
    },
    rightAns: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
}, { timestamps: true })
export default mongoose.models.questions || mongoose.model("question", questionsSchema)