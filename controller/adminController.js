import asyncHandler from "express-async-handler"
import Course from "../models/Course.js"
import imageUpload from "../utils/upload.js"
import CourseContent from "../models/CourseContent.js"
import Student from "../models/Student.js"
import Exam from "../models/Exam.js"
import Questions from "../models/Questions.js"
import HomeWork from "../models/HomeWork.js"
import Attendence from "../models/Attendence.js"
import Installment from "../models/Installment.js"
import validator from "validator"
import hwUpload from "../utils/uploadhw.js"
import { installmentTemplate } from "../email/installmentTemplate.js"
import sendEmail from "../utils/email.js"


//course
export const getAllCourses = asyncHandler(async (req, res) => {
    const result = await Course.find()
    res.status(200).json({
        message: "add content success ",
        result
    })
})

export const addCourses = asyncHandler(async (req, res) => {
    imageUpload(req, res, async err => {
        if (err) {
            return res.status(500).json({ error: err.message || "image upload error" })
        }
        const { contentId, courseName, courseImage, courseFee, courseDuration, } = req.body
        if (!validator.isMongoId(contentId)) {
            return req.status(400).json({ error: "Invalid Id" })
        }
        if (validator.isEmpty(courseName)) {
            return req.status(400).json({ error: "Invalid name" })
        }
        // if (validator.isEmpty(courseImage)) {
        //     return req.status(400).json({ error: "Invalid image" })
        // }
        if (validator.isEmpty(courseFee)) {
            return req.status(400).json({ error: "Invalid fee" })
        }
        if (validator.isTime(courseDuration)) {
            return req.status(400).json({ error: "Invalid time" })
        }
        console.log(req.body);
        if (req.file) {
            await Course.create({ ...req.body, courseImage: req.file.filename })
            res.status(200).json({ message: "add course success " })
        } else {
            await Course.create({ ...req.body })
            res.status(200).json({ message: "add course success " })
        }

    })

    // res.status(200).json({ message: "add  course success " })
})

export const updateCourses = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await Course.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "update course success " })
})
export const deleteCourses = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await Course.findByIdAndDelete(id)
    res.status(200).json({ message: "delete course success " })
})
//content
export const getAllContent = asyncHandler(async (req, res) => {

    const result = await CourseContent.find({ stuId: req.params.id })
    res.status(200).json({ message: "Installment Fetch Success ", result })
})

export const addContent = asyncHandler(async (req, res) => {
    const { name, topic } = req.body
    if (validator.isEmpty(name)) {
        return res.status(400).json({ eror: "Invalid name" })
    }
    if (validator.isEmpty(topic)) {
        return res.status(400).json({ eror: "Invalid topic" })
    }
    await CourseContent.create(req.body)
    res.status(201).json({
        message: "add content success "
    })
})

export const updateContent = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await CourseContent.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "update content success " })
})
export const deleteContent = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await CourseContent.findByIdAndDelete(id)
    console.log(id);
    res.status(200).json({ message: "delete content success " })
})
//student
export const blockStudent = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Student.findByIdAndUpdate(id, { active: false })
    res.status(200).json({ message: "block student success ", result })
})
export const unblockStudent = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Student.findByIdAndUpdate(id, { active: true })
    res.status(200).json({ message: "block student success ", result })
})
export const getAllStudent = asyncHandler(async (req, res) => {
    const result = await Student.find()
    res.status(200).json({ message: "fetch all student success ", result })
})

export const addStudent = asyncHandler(async (req, res) => {
    const { email, courseId, mobile, homeContact, address } = req.body
    const test = await Student.findOne({ email })
    if (test) {
        return res.status(400).json({ error: 'student already exists ' });

    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid Email" })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ error: "Invalid mobile" })
    }
    if (!validator.isMobilePhone(homeContact, "en-IN")) {
        return res.status(400).json({ error: "Invalid mobile" })
    }
    if (!validator.isMongoId(courseId)) {
        return res.status(400).json({ error: "Invalid Id" })
    }
    await Student.create(req.body)
    res.status(201).json({
        message: "add student success "
    })
})

export const updateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await Student.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "update Student success " })
})
export const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await Student.findByIdAndDelete(id)
    res.status(200).json({ message: "delete Student success " })
})
//Attendence
export const getStudentAttendenceHist = asyncHandler(async (req, res) => {
    // const result = await Attendence.find()
    const { id } = req.params
    const attendenceDetails = await Attendence.find({ stuId: id })
    const studentDetails = await Student.findById(id)
    const coursetDetails = await Course.findOne(studentDetails.courseId[0])
    res.status(200).json({
        message: "fetch all attendence success ", result: {
            name: studentDetails.name,
            course: coursetDetails.courseName,
            Attendence: attendenceDetails
        }
    })
})
export const getAllAttendence = asyncHandler(async (req, res) => {
    const result = await Attendence.find()
    res.status(200).json({ message: "fetch all attendence success ", result })
})

export const addAttendence = asyncHandler(async (req, res) => {
    const { stuId, datetime, presenties } = req.body;
    const demo = await Attendence.findOne({ stuId, datetime });
    if (demo) {
        return res.status(400).json({ error: 'Attendance already exists ' });
    }
    if (!validator.isDate(datetime)) {
        return res.status(400).json({ error: "Invalid Date" })
    }
    if (!validator.isMongoId(stuId)) {
        return res.status(400).json({ error: "Invalid Id" })
    }
    if (validator.isEmpty(presenties)) {
        return res.status(400).json({ error: "Invalid attendence" })
    }

    await Attendence.create(req.body);
    return res.status(201).json({
        message: "Attendance add success333 ."
    });
});

export const updateAttendence = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await Attendence.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "fetch all attendence success " })
})
export const deleteAttendence = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid delete Id" })
    }
    await Attendence.findByIdAndDelete(id)
    res.status(200).json({ message: "fetch all attendence success " })
})
//Exam
export const getStudentExamHist = asyncHandler(async (req, res) => {
    // const result = await Exam.find()
    const { id } = req.params
    const examDetails = await Exam.find({ courseId: id })
    const coursetDetails = await Course.findById(id)

    res.status(200).json({
        message: "fetch all Exam success ", result: {

            course: coursetDetails.courseName,
            exams: examDetails
        }
    })
})
export const getExam = asyncHandler(async (req, res) => {
    const result = await Exam.find()
    res.status(200).json({ message: "fetch all Exam success ", result })
})

export const addExam = asyncHandler(async (req, res) => {
    const { date, name, question } = req.body
    for (const item of question) {
        if (!validator.isMongoId(item)) {
            return res.status(400).json({ error: "Invalid id" })
        }

    }
    if (!validator.isDate(date)) {
        return res.status(400).json({ error: "Invalid date" })
    }
    if (validator.isEmpty(name)) {
        return res.status(400).json({ error: "Invalid name" })
    }
    // if (!validator.isMongoId(question)) {
    //     return res.status(400).json({ error: "Invalid q" })
    // }
    await Exam.create(req.body)
    res.status(201).json({
        message: "add all Exam success "
    })
})

export const updateExam = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid delete Id" })
    }
    await Exam.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "fetch all Exam success " })
})
export const deleteExam = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid delete Id" })
    }
    await Exam.findByIdAndDelete(id)
    res.status(200).json({ message: "fetch all Exam success " })
})
//Installment
export const getStudentInstallment = asyncHandler(async (req, res) => {
    const { id } = req.params
    const installmentDetails = await Installment.find({ stuId: id })
    const studentDetails = await Student.findById(id)
    const coursetDetails = await Course.findOne(studentDetails.courseId[0])
    // const result = await Installment.find()
    res.status(200).json({
        message: "fetch all Installment success ", result: {
            // id: installmentDetails._id,
            name: coursetDetails.courseName,
            course: studentDetails.courseId,
            fee: coursetDetails.courseFee,
            installment: installmentDetails
        }
    })
})

export const getInstallment = asyncHandler(async (req, res) => {
    const result = await Installment.find()
    res.status(200).json({ message: "fetch all Installment success ", result })
})

export const addInstallment = asyncHandler(async (req, res) => {
    const { stuId, date, amount, email } = req.body
    if (!validator.isMongoId(stuId)) {
        return res.status(400).json({ error: "Invalid Id" })
    }
    if (!validator.isDate(date)) {
        return res.status(400).json({ error: "Invalid date" })
    }
    if (validator.isEmpty(amount)) {
        return res.status(400).json({ error: "please fill  am" })
    }
    const studentDetails = await Student.findById(stuId)

    const courseDetails = await Course.findOne(studentDetails.courseId[0])
    console.log(courseDetails);
    const installments = await Installment.find({ stuId });
    const totalPaid = installments.reduce((acc, installment) => {
        return acc + Number(installment.amount);
    }, 0);
    const Balance = courseDetails.courseFee - totalPaid - Number(amount);

    await sendEmail({
        to: studentDetails.email,
        subject: "welcome to Skillhub",
        message: installmentTemplate({ name: studentDetails.name })
    })

    // await Installment.create(req.body)
    res.status(201).json({
        message: "fetch all Installment success",
        Balance
    })
})

export const updateInstallment = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await Installment.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "fetch all Installment success " })
})
export const deleteInstallment = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid delete Id" })
    }
    await Installment.findByIdAndDelete(id)
    res.status(200).json({ message: "fetch all Installment success " })
})
//Questions
export const getQuestions = asyncHandler(async (req, res) => {
    const result = await Questions.find()
    res.status(200).json({ message: "fetch all Questions success ", result })
})

export const addQuestions = asyncHandler(async (req, res) => {
    const { question, op1, op2, op3, op4, stuAns, rightAns, explanation } = req.body
    if (validator.isEmpty(question)) {
        return res.status(400).json({ error: "Invalid question" })
    }
    if (validator.isEmpty(op1)) {
        return res.status(400).json({ error: "Invalid option" })
    }
    if (validator.isEmpty(op2)) {
        return res.status(400).json({ error: "Invalid option" })
    }
    if (validator.isEmpty(op3)) {
        return res.status(400).json({ error: "Invalid option" })
    }
    if (validator.isEmpty(op4)) {
        return res.status(400).json({ error: "Invalid option" })
    }
    if (validator.isEmpty(stuAns)) {
        return res.status(400).json({ error: "Invalid Ans" })
    }
    if (validator.isEmpty(rightAns)) {
        return res.status(400).json({ error: "Invalid Correct Ans" })
    }
    if (validator.isEmpty(explanation)) {
        return res.status(400).json({ error: "Invalid explanation" })
    }
    await Questions.create(req.body)
    res.status(201).json({
        message: "fetch all Questions success "
    })
})

export const updateQuestions = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await Questions.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "fetch all Questions success " })
})
export const deleteQuestions = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid delete Id" })
    }
    await Questions.findByIdAndDelete(id)
    res.status(200).json({ message: "fetch all Questions success " })
})
//HomeWork
export const getStudentHomeWorkDetails = asyncHandler(async (req, res) => {
    // const result = await HomeWork.find()
    const { id } = req.params
    const homeWorkDetails = await HomeWork.find({ courseId: id })
    const coursetDetails = await Course.findById(id)
    res.status(200).json({
        message: "fetch all HomeWork success ", result: {
            course: coursetDetails.courseName,
            task: homeWorkDetails
        }
    })
})
export const getHomeWork = asyncHandler(async (req, res) => {
    const result = await HomeWork.find()
    res.status(200).json({ message: "fetch all HomeWork success ", result })
})

export const addHomeWork = asyncHandler(async (req, res) => {
    hwUpload(req, res, async err => {
        if (err) {
            return req.status(500).json({ error: err.message || "image upload error" })
        }
        const { courseId, title, desc, image } = req.body
        if (!validator.isMongoId(courseId)) {
            return res.status(400).json({ error: "Invalid Id" })
        }
        if (validator.isEmpty(title)) {
            return res.status(400).json({ error: "plaease fill title" })
        }
        if (validator.isEmpty(desc)) {
            return res.status(400).json({ error: "plaease fill desc" })
        }
        // if (!validator.isEmpty(image)) {
        //     return res.status(400).json({ error: "plaease fill img" })
        // }
        if (req.file) {
            await HomeWork.create({ ...req.body, image: req.file.filename })
            res.status(200).json({ message: "add homework success" })
        } else {
            await HomeWork.create({ ...req.body })
            res.status(200).json({ message: "add hw success" })
        }
    })
})

export const updateHomeWork = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid update Id" })
    }
    await HomeWork.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "fetch all HomeWork success " })
})
export const deleteHomeWork = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid delete Id" })
    }
    await HomeWork.findByIdAndDelete(id)
    res.status(200).json({ message: "fetch all HomeWork success " })
})
