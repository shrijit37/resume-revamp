import { model, Schema, mongoose } from "mongoose";

const resumeSchema = new Schema(
    {
        uuid : {
            type : String,
            required: true,
            unique : true
        },
        latexCode : {
            type : String,
            required: true
        },
        clsCode: {
            type : String,
            required: true
        },
        contributor : {
            type : String,
            required: true
        }
    }, {timestamps:true}
);

const resumeTempleteModel = mongoose.model('resumeTemplete', resumeSchema);
export default resumeTempleteModel;