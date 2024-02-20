import mongoose from "mongoose";


const attendenceSchema = mongoose.Schema({
    stuId: {
        type: mongoose.Types.ObjectId,
        ref: "student",
        required: true
    },
    presenties: {
        // type: Boolean,
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    }
}, { timestamps: true })
export default mongoose.models.attendence || mongoose.model("attendence", attendenceSchema)