const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { UserModel } = require("../Model/userModel");
const instaRouter=express.Router();


instaRouter.post("/register",async(req,res)=>{
const {name,email,gender,password,age,city,is_married}=req.body;
try {
    bcrypt.hash(password, 5, async(err, hash) =>{
       if(err){
        res.send({"err":err})
       }
       else{
        const user= new UserModel({name,email,gender,password:hash,age,city,is_married});
        await user.save()
        res.json({msg:"new user has registered",user:req.body})
       }
    });
} catch (error) {
    res.send({"error":error})
}
})


instaRouter.post("/login",async(req,res)=>{
const {email,password}=req.body;

try {
    const user= await UserModel.findOne({email});
    if(user){
        bcrypt.compare(password, user.password, (err, result)=> {
           if(result){
            const token=jwt.sign({userID:user._id,user:user.name},"insta",{
                expiresIn:"7d"
            })
            res.status(200).send({"msg":"user logged in","token":token})
           }
           else{
            res.send({"err":err})
           }
        });
    }
    else{
        res.send({"msg":"user does not exist"})
    }
} catch (error) {
    res.send({"err":error})
}
})


module.exports={
    instaRouter
}