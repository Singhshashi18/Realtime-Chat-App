import express from "express"
// import router from "./routes/auth.route";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieparser from 'cookie-parser'
import cors from 'cors'
import { app,server } from "./lib/socket.js";
dotenv.config()
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json())
const PORT=process.env.PORT
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

server.listen(PORT,()=>{
    console.log("server is running" , PORT)
    connectDB();

})