import express from "express";
import {contributeResume, getAllCommunityResume } from "../controllers/communityResumeController.js"
import { optimizeResumeFromJD, atsCheckWithResume } from "../controllers/resumeController.js";
import multer from "multer";
import path from "path";

const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowed = /pdf/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("PDFs allowed!"));
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});


router.get("/", (req, res) => {
    res.send("resume route is working.");
})

router.post("/community/contribute", contributeResume);    //sending resume to the database
router.get('/community/getall', getAllCommunityResume);    //getting all the community listed resume
router.post(`/user/optimizewithjd`, optimizeResumeFromJD)
router.post('/user/atscheckwithresume',upload.single('resumeFile'), atsCheckWithResume)
// router.post('/user/atscheckwithjd',upload.single('resumeFile'), atsCheckWithJd)

export default router;