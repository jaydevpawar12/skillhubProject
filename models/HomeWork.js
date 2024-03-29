import mongoose from "mongoose";


const homeWorkSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "course",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

}, { timestamps: true })
export default mongoose.models.homeWork || mongoose.model("homework", homeWorkSchema)