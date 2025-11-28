import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET)
}
// user login route
const loginUser=async(req,res)=>{
  try {
      const {email,password}=req.body;

    const user=await userModel.findOne({email})
    if(!user){
          return res.status(404).json({
                success:false,
                message:'User does not exisits'
            })
    }

    const isMatch= await bcrypt.compare(password,user.password);

    if(isMatch){
        const token=generateToken(user._id)
         res.status(200).json({
            success:true,
            token
        })
    }
    else{
         res.status(401).json({
            success:false,
            message:'Invalid Credentials'
        })
    }

  } catch (error) {
     
     console.log(error);
         res.status(500).json({
            success:false,
            message:error.message
        })
  }
   
}

// user register route
const registerUser=async(req,res)=>{
    
    try {
        const {name,email,password}=req.body;
        // checking user already exists
        const exists=await userModel.findOne({email});

        if(exists){
             return res.status(409).json({
                success:false,
                message:'User already exisits'
            })
        }
        if(!validator.isEmail(email)){
             return res.status(400).json({
                success:false,
                message:'Please enter  a valid email'
            })
        }
        if(password.length < 8){
             return res.status(400).json({
                success:false,
                message:'Please enter  a strong password'
            })
        }

        // salt to hash password- values 5-15- large value = to large processing time
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser= new userModel({
            name, email,password:hashedPassword
        })

        const user= await newUser.save();

        const token=generateToken(user._id)

        res.status(201).json({
            success:true,
            token
        })
    } catch (error) {
        console.log(error);
         res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}
// adminLogin route
const adminLogin=async(req,res)=>{
try {
    const {email,password}=req.body;
    if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true,token})
    }else{
        res.json({success:false, message:"Invalid Credentials"})
    }
} catch (error) {
     console.log(error);
         res.status(500).json({
            success:false,
            message:error.message
        })
        
}
}

export {loginUser,registerUser,adminLogin}