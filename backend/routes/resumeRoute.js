import express from "express";
import {contributeResume} from "../controllers/communityResumeController.js"
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');


router.get("/", (req, res) => {
    res.send("resume route is working.");
})

router.post("/contribute", contributeResume);


export default router;