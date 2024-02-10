const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("../models/userModel");
const registerValidator = require("../middleware/registerValidator");
const loginValidator = require("../middleware/loginValidator");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
const secretKey = "xyz133@#";
const refreshSecretKey = "cgh12567#45";
const expireTime = 180 ;

router.post("/register",registerValidator,async(req,res)=>{
   try{  
       res.status(200).send("Registration success");

   }catch(error){
    console.log("Error while registring new user...",error);
   }
});

router.post("/login",loginValidator,async(req,res)=>{
    try{
        const {email} = req.body ;
        const user = await UserModel.findOne({email});
        const accessToken = jwt.sign({"userName":user.username},secretKey,{expiresIn:expireTime});
        const refreshToken = jwt.sign({"userID":user._id},refreshSecretKey,{expiresIn:"7days"});
        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.status(200).send({"username":user.username});
    }catch(error){
        console.log("Error while logging ...",error);
    }
})

router.get("/blogs",verifyToken,async(req,res)=>{
    try{
        res.status(200).send({"msg":"You are now authorized for the restricted routes"});
    }catch(error){
        console.log("error while verying token...",error);
    }
})

router.get("/user/:id",async(req,res)=>{
    try{
        const userId = req.params.id ;
        console.log("UserId is :",userId);
        const user = await UserModel.findOne({_id:userId});
        res.status(200).send({"List of user":user});

    }catch(error){
        console.log("Error while fething user",error);
    }
});



module.exports = { router , secretKey } ;