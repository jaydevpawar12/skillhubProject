import { Router } from "express";
import {
    addAttendence,
    addContent,
    addCourses,
    addExam,
    addHomeWork,
    addInstallment,
    addQuestions,
    addStudent,
    blockStudent,
    deleteAttendence,
    deleteContent,
    deleteCourses,
    deleteExam,
    deleteHomeWork,
    deleteInstallment,
    deleteQuestions,
    deleteStudent,
    getAllAttendence,
    getAllContent,
    getAllCourses,
    getAllStudent,
    getExam,
    getHomeWork,
    getInstallment,
    getQuestions,
    getStudentAttendenceHist,
    getStudentExamHist,
    getStudentHomeWorkDetails,
    getStudentInstallment,
    unblockStudent,
    updateAttendence,
    updateContent,
    updateCourses,
    updateExam,
    updateHomeWork,
    updateInstallment,
    updateQuestions,
    updateStudent
} from "../controller/adminController.js";



const router = Router()

router
    //Course
    .get("/course", getAllCourses)
    .post("/course/add", addCourses)
    .put("/course/update/:id", updateCourses)
    .delete("/course/delete/:id", deleteCourses)
    //content
    .get("/content", getAllContent)
    .post("/content/add", addContent)
    .put("/content/update/:id", updateContent)
    .delete("/content/delete/:id", deleteContent)
    //student
    .get("/student", getAllStudent)
    .post("/student/block/:id", blockStudent)
    .post("/student/unblock/:id", unblockStudent)
    .post("/student/add", addStudent)
    .put("/student/update/:id", updateStudent)
    .delete("/student/delete/:id", deleteStudent)
    //Attendence
    .get("/attendenceDetails/:id", getStudentAttendenceHist)
    .get("/attendence", getAllAttendence)
    .post("/attendence/add", addAttendence)
    .put("/attendence/update/:id", updateAttendence)
    .delete("/attendence/delete/:id", deleteAttendence)
    //exam
    .get("/examDetails/:id", getStudentExamHist)
    .get("/exam", getExam)
    .post("/exam/add", addExam)
    .put("/exam/update/:id", updateExam)
    .delete("/exam/delete/:id", deleteExam)
    //Installment
    .get("/installmentDetails/:id", getStudentInstallment)
    .get("/installment", getInstallment)
    .post("/installment/add", addInstallment)
    .put("/installment/update/:id", updateInstallment)
    .delete("/installment/delete/:id", deleteInstallment)
    //question
    .get("/question", getQuestions)
    .post("/question/add", addQuestions)
    .put("/question/update/:id", updateQuestions)
    .delete("/question/delete/:id", deleteQuestions)
    //Homework
    .get("/homeworkDetails/:id", getStudentHomeWorkDetails)
    .get("/homework", getHomeWork)
    .post("/homework/add", addHomeWork)
    .put("/homework/update/:id", updateHomeWork)
    .delete("/homework/delete/:id", deleteHomeWork)

export default router