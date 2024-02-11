
const express = require("express");
const userRegisterValidator = require("../middleware/userRegisterValidator");
const userLoginvalidator = require("../middleware/userLoginvalidator");
const jwt = require("jsonwebtoken");

const secretKey = process.env.Secretkey ;
const refreshSecretKey = process.env.RefreshSecretKey ;
const userRouter = express.Router();

userRouter.post("/register",userRegisterValidator,async(req,res)=>{
    try{
        res.status(200).send("Registration successful");
    }catch(error){
        console.log("Error while creating new user!");
    }
});

userRouter.post("/login",userLoginvalidator,async(req,res)=>{
    try{
        const accessToken = jwt.sign({"username":req.username,"userId":req.userId},secretKey,{expiresIn:"1hr"});
        const refreshToken = jwt.sign({"userId":req.userId},refreshSecretKey,{expiresIn:"7days"});
        res.status(200).send({"msg":"Successfully login","username":req.username,"accessToken":accessToken,"refreshToken":refreshToken});

    }catch(error){
        console.log("Error while logging...",error)
    }
})

module.exports = userRouter ;