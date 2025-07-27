import Express from "express";
import dotenv from "dotenv"
import test from "./routes/test.js";
import resumeRoute from "./routes/resumeRoute.js"
import connectDb from "./db/config.js";
dotenv.config();
const app = Express();
app.use(Express.json()); 
app.use(Express.urlencoded({ extended: true }));
connectDb();

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))

app.use('/test', test);
app.use('/api/resume/', resumeRoute);
