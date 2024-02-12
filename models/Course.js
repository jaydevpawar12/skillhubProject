import mongoose from "mongoose"


const courseSchema = mongoose.Schema({
    contentId: {
        type: [mongoose.Types.ObjectId],
        ref: "content",
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    courseImage: {
        type: String,
        required: true
    },
    courseFee: {
        type: String,
        required: true
    },
    courseDuration: {
        type: String,
        required: true
    },
    // courseContent: {
    //     type: [String],
    //     required: true
    // }
}, { timestamps: true })
export default mongoose.models.courseSchema || mongoose.model("course", courseSchema)

