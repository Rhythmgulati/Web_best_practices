import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AsyncHandler from '../services/AsyncHandler.js';
import { User } from '../models/User.js';
import ApiResponse from '../services/ApiResponse.js';


const register = AsyncHandler(async (req,res) => {
    const {username,email,password} = req.body;
    console.log(req.body);
    console.log("ehllooo");
    

    let user = await User.findOne({email});

    if(user){
      return res.json(ApiResponse.error(200,"User Already Exist"));
    }

    const hashed= await bcrypt.hash(password,10);
    user = new User({username,email,password:hashed});
    await user.save();
    
    res.json(ApiResponse.success(201,"User Registered"));
});

const login = AsyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    let user = await User.findOne({email});
    if(!user){
        res.json(ApiResponse.error(401,"Invalid Credentials"));
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.json(ApiResponse.error(401,"Invalid Credentials"));
    }

    const token = jwt.sign({user:{id:user._id}},process.env.JWT_SECRET,{
        expiresIn:"1d",
    })

    res.json(ApiResponse.success(201,"Success",token));
 });

export {register,login};