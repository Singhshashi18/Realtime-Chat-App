import jwt from "jsonwebtoken"
import User from "../models/user.model.js"  

export const protectRoute=async (req,res,next)=>{
try {
    console.log(req.cookies)
    const token=req.cookies.jwt
    if(!token){
        res.status(401).json({message:"no token provided"})
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        res.status(401).json({message:"invalid token"})
    }

    const user=await User.findById(decoded.userId).select("-password")

    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    req.user=user;
    next();
} catch (error) {
     console.log("error in middleware",error.message)
}
} 