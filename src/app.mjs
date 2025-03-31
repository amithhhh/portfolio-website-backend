import dotenv from 'dotenv'
import express from 'express'
import connectDB from '../config/db.mjs'
import cors from 'cors'
import authRouter from '../routes/authRoutes.mjs'
import cookieParser from 'cookie-parser'
import messageRoute from '../routes/messageRoutes.mjs'
import productRoute from '../routes/dashboardRoutes.mjs'

dotenv.config()
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    credentials: true
}));

connectDB();

app.use('/api/auth', authRouter)
app.use('/api/message', messageRoute)
app.use('/api/',productRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server running on port 5000"))
