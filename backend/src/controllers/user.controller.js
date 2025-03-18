import { User } from "../models/user.model.js";
import bcrypt,{hash} from 'bcrypt';
import httpStatus from "http-status";
import crypto from "crypto";

const login = async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({
            "Message":"Please provide username and password"
        });
    }
    try{
        const user = await User.findOne({
            username
        });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({
                "Message":"User not found"
            });
        }
        if(bcrypt.compare(password,user.password)){
            let token = crypto.randomBytes(64).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({
                "Message":"User logged in",
                "token":token
            });
        }
    }
    catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            "Message":"Internal Server Error"
        });
    }
}

const register = async(req,res)=>{
    const {name,username,password} = req.body;

    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({
                "Message":"User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            name,
            username,
            password:hashedPassword
        });
        await newUser.save();
        return res.status(httpStatus.CREATED).json({
            "Message":"User created"
        });
    }
    catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            "Message":"Internal Server Error"
        });
    }
  
}

export {login,register};