import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup=async (req,res)=>{
    const {fullName,email,password}=req.body;
    try {
        if(!fullName || !email || !password)
            return res.status(400).json({message:"all fields are required"})
        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters"})
        }
            const user=await User.findOne({email})
            if(user) return res.status(400).json({message:"Email already exists"});

           const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)

            const newUser=new User ({
                fullName:fullName,
                email:email,
                password:hashedPassword
            });
            if(newUser){
             generateToken(newUser._id,res);
             await newUser.save();

             res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilPic:newUser.profilePic,
             });
            }else{
                res.status(400).json({message:"invalid user credentials"})
            }
        
    } catch (error) {
        console.log("error in signup controller",error.message)
    }
};
export const login=async (req,res)=>{
    const {email,password}= req.body;

    try {
        const user=await User.findOne({email})

    if(!user){
        return res.status(400).json({message:"invalid Email"})
    }
   const comparedPass= await bcrypt.compare(password,user.password);
   if(!comparedPass){
   return res.status(400).json({message:"invalid password"})
   }
   generateToken(user._id,res)

   res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    profilPic:user.profilePic,
   }
   );
    } catch (error) {
        console.log("error in login controller",error)
    }

};
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"});
    } catch (error) {
        console.log("error in log out controller",error.message)
    }
};

export const updateProfile=async (req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;

        if(!profilePic){
            res.status(400).json({message:"profilePic required"});
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic)
        const updatedUser=await User.findByIdAndUpdate(userId,
            {profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in uploading profile pic ",error.message)
    }
}

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);

    } catch (error) {
        console.log("error in checkAuth controller",error.message)
    }
}