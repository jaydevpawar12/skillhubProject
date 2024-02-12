import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid"

const imageStorage = multer.diskStorage({
    filename: (req, file, next) => {
        const ext = path.extname(file.originalname)
        const fn = uuid() + ext
        next(null, fn)
    },
    destination: (req, file, next) => {
        next(null, `uploads`)
    }
})
const imageUpload = multer({ storage: imageStorage }).single("courseImage")
export default imageUpload