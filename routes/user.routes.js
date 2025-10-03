const express=require("express")
const userModel = require("../model/user.model")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
userRouter.post("/register",async(req,res)=>{
    const payload=req.body
    try {
       const reqData=await userModel.find({email:payload.email})
       if(reqData.length>0){
        res.status(200).send({"msg":"User ALready Register"})
       }
       bcrypt.hash(payload.password, 5,async function(err, hash) {
      
        if(err){
            res.status(200).send({"msg":"Something Error with bcrypt"})
        }
        const addData=await userModel({
        username:payload.username,
        email:payload.email,
        avatar:payload.avatar,
        password:hash
        })
        await addData.save()
        res.status(200).send({"msg":"User Register Successfully"})
    });
    } catch (error) {
        res.status(400).send({"msg":"Something Went wrong","error":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
       const reqData=await userModel.find({email})
       if (!email) {
        errors.email = "User not found";
        res.status(404).json({ errors });
      }
       if(reqData.length==0){
        return res.status(200).send({"msg":"Please Register First"})
       }else{
    
     bcrypt.compare(password, reqData[0].password, function(err, result) {
        if(result){
        var token=jwt.sign(  { foo: 'bar' },process.env.key)
            res.status(200).send({"msg":"User logged success","token":token})
        }else{
            res.status(200).send({"msg":"wrong creditials"})
        }
     });
       }
  
    } catch (error) {
        res.status(400).send({"msg":"something went wrong"})

    }
})


module.exports=userRouter
