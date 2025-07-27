import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to db.")
    } catch(e) {
        console.log(e);
        process.exit(1);
    }
}


export default connectDb;