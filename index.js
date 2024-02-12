import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })
import adminRoutes from "./routes/adminRoutes.js"
import authRoute from "./routes/authRoute.js"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.static("uploads"))
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true
}))
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoute)

app.use((err, req, res, next) => {
    console.log(err);
    // notfier.notify({
    //     title: err.message,
    //     message: `Resource not found @ ${req.path} ${req.method}`
    // })
    res.status(500).json({
        error: err.message || " Something went wrong"
    })

})
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT || 5000, console.log(`server running on http://localhost:${process.env.PORT}`))
})