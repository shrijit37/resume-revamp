import express from "express";
import asyncHandler from "express-async-handler";
import resumeTempleteModel from "../models/resumeModel.js";
import optimizeResume from "../utils/optimizeResume.js";
import latexToPDF from "../utils/latexToPDF.js";
import getAtsWithResumePrompt from "../prompts/atsWithResumePrompt.js"
import pdf from "pdf-parse";
import LLM from "../utils/getAtsScoreResume.js";



const router = express.Router();


const optimizeResumeFromJD = asyncHandler(async(req, res) => {
    const {resumeID, jd} = req.body;

    if(!resumeID || !jd) {
        res.status(400).json({message: "Please fill all the details."});
        return;
    }
    try{
    const fetchedResume = await resumeTempleteModel.findOne({uuid: resumeID});
    const optimizedResume = await optimizeResume(jd, fetchedResume.latexCode);
    // console.log(optimizeResume);
    // res.status(201).json({Resume: optimizedResume});
    // const clsFileContent = latexCode.clsCode;
    // res.send(optimizedResume);
    // console.log(fetchedResume.clsCode);

    const pdfBuffer = await latexToPDF(optimizedResume, fetchedResume.clsCode);
        
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=resume.pdf");
    res.send(pdfBuffer);
    } catch(e) {
        console.log(e);
        res.status(400).json({e});
    }
})


const atsCheckWithResume = asyncHandler(async(req, res) => {
    // console.log(req.file);
    try {
        const data = await pdf(req.file.path);
        const prompt = getAtsWithResumePrompt(data.text);
        const report = await LLM(prompt);
        // const cleaned = cleanAIResponse(report);
        const parsed = JSON.parse(report);

        res.status(200).json(parsed);
    } catch(e) {
        res.status(400).json({message : "error parsing the resume."}); 
    }
    
    
})

const atsCheckWithJd = asyncHandler(async(req, res) => {
    // try {
    //     const data = await pdf(req.file.path);

    // }
})


export {optimizeResumeFromJD, atsCheckWithResume, atsCheckWithJd};