import asyncHandler from "express-async-handler"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Student from "../models/Student.js"
import sendEmail from "../utils/email.js"
import { registerTemplate } from "../email/registerTemplate.js"

export const registerStudent = asyncHandler(async (req, res) => {
    const { email, password, mobile, name } = req.body
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: `Invalid Email` })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ error: `Invalid Mobile` })
    }

    // if (!validator.isStrongPassword(password)) {
    //     return res.status(400).json({ error: `Weak Password` })
    // }
    const studentDetails = await Student.findOne({ email })
    if (studentDetails) {
        return res.status(500).json({ error: `Email Already Registered` })
    }
    // const result = await Student.findOne({ email })
    await sendEmail({
        to: email,
        subject: "welcome to Skillhub",
        message: registerTemplate({ name })
    })
    // if (result) {
    //     return res.status(500).json({ error: `Email Already Registered` })
    // }
    const hash = await bcrypt.hash(password, 10)
    await Student.create({ ...req.body, password: hash, role: 'user' })
    res.status(200).json({
        message: "Register Successs",
    })
})

export const loginStudent = asyncHandler(async (req, res) => {
    const { email, password, active } = req.body

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: `Invalid Email` })
    }
    const result = await Student.findOne({ email })
    console.log("aaaa", result);
    if (!result) {
        return res.status(500).json({ error: `Email Not Registered` })
    }
    if (result.active == false) {
        return res.status(500).json({ error: `student is block` })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(500).json({ error: `Invalid Password` })
    }
    const token = jwt.sign({ stuId: result._id }, process.env.JWT_KEY, { expiresIn: "1h" })
    res.cookie("student", token, { httpOnly: true })
    res.status(200).json({
        message: "Login Successs",
        result: {
            name: result.name,
            email: result.email,
            // role: result.role
        }
    })
})
export const loginEmployee = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: `Invalid Email` })
    }


    const result = await Student.findOne({ email })
    console.log("aaaa", result);
    if (!result) {
        return res.status(500).json({ error: `Email Not Registered` })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(500).json({ error: `Invalid Password` })
    }
    const token = jwt.sign({ stuId: result._id }, process.env.JWT_KEY, { expiresIn: "1h" })
    res.cookie("employee", token, { httpOnly: true })
    res.status(200).json({
        message: "Login Successs",
        result: {
            name: result.name,
            email: result.email,
            role: result.role
        }
    })
})