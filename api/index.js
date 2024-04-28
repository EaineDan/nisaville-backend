import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { UserRouter }  from './routes/user.route.js'
dotenv.config()


const app = express();

app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}))
app.use(express.json())
app.use('/auth', UserRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(4000, () => {
  console.log('Server is running on port 4000')
})