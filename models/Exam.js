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
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "course",
        required: true
    },
    duration: {
        type: String, 
        default: true
    },

}, { timestamps: true })
export default mongoose.models.exam || mongoose.model("exam", examSchema)