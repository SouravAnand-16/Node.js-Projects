
const express = require("express");
const userRegisterValidator = require("../middleware/userRegisterValidator");
const userLoginvalidator = require("../middleware/userLoginvalidator");
const auth = require("../middleware/auth");
const BlacklistModel = require("../models/blackListModel");
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
});

userRouter.post("/logout", auth, async (req, res) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        const refreshToken = req.headers.authorization?.split(" ")[2];

        if (accessToken) {
            await BlacklistModel.create({ token: accessToken, type: 'access' });
        }
        if (refreshToken) {
            await BlacklistModel.create({ token: refreshToken, type: 'refresh' });
        }

        res.status(200).send({ "msg": "Successfully logged out" });
    } catch (error) {
        console.log("Error while logging out...", error);
        res.status(500).send({ "error": "Internal Server Error" });
    }
});

module.exports = userRouter ;