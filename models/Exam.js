import mongoose from "mongoose";


const examSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    question: {
        type: [mongoose.Types.ObjectId],
        ref: "question",
        required: true
    },
}, { timestamps: true })
export default mongoose.models.examSchema || mongoose.model("exam", examSchema)