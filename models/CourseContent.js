import mongoose from "mongoose";


const contentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    }
}, { timestamps: true })
export default mongoose.models.content || mongoose.model("content", contentSchema)