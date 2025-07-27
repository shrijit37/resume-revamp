import asyncHandler from 'express-async-handler'
import resumeTempleteModel from '../models/resumeModel.js';
import latexToPDF from '../utils/latexToPDF.js';
import { v4 as uuidv4 } from 'uuid';

const contributeResume = asyncHandler(async (req, res) => {
    const { latexCode, contributor, clsCode } = req.body;

    // Example validation
    if (!latexCode || !contributor || !clsCode) {
        res.status(400);
        throw new Error('latexCode and contributor are required');
    }
    
    try {const newResume = await resumeTempleteModel.create({
        uuid : uuidv4(),
        latexCode : latexCode,
        clsCode : clsCode,
        contributor : contributor
    });} catch(e) {
        console.log(e)
        res.status(400).json({message: "error happend"});
    }
    res.status(201).json({message: "saved to db"});
    const resume = await resumeTempleteModel.findOne({ uuid : "1" });

    const pdfBuffer = await latexToPDF(resume.latexCode, resume.clsCode);
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=resume.pdf");
        res.send(pdfBuffer);
    console.log(resume);

    
});



export { contributeResume };