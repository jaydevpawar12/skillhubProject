import asyncHandler from "express-async-handler"
import validator from "validator"
import jwt from "jsonwebtoken"
import Student from "../models/Student"
// import expressAsyncHandler from "express-async-handler"

export const protectedRoute = asyncHandler((req, res, next) => {
    const { student } = req.cookies
    if (!student) {
        return res.status(401).json({ error: "No Cookie Found" })
    }
    if (!validator.isJWT(student)) {
        return res.status(401).json({ error: "INVALID Token" })
    }
    jwt.verify(student, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ error: "Token Missmatched" })
        }
        req.body.userId = decode.userId

        next()
    })

})



export const adminProtectedRoute = asyncHandler((req, res, next) => {
    const { student } = req.cookies
    if (!student) {
        return res.status(401).json({ error: "No Cookie Found" })
    }
    if (!validator.isJWT(student)) {
        return res.status(401).json({ error: "INVALID Token" })
    }
    jwt.verify(student, process.env.JWT_KEY, async (err, decode) => {
        if (err) {
            return res.status(401).json({ error: "Token Missmatched" })
        }
        const result = await Student.findById(decode.userId)
        if (result.role !== "admin") {
            return res.status(401).json({ error: "Admin Only Route" })
        }
        req.body.userId = decode.userId
        next()
    })

})