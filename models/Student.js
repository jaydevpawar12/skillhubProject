import mongoose from "mongoose";


const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    courseId: {
        type: [mongoose.Types.ObjectId],
        ref: "course",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    homeContact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    active: {
        type: Boolean,
        default:true
    },
}, { timestamps: true })
export default mongoose.models.student || mongoose.model("student", studentSchema)