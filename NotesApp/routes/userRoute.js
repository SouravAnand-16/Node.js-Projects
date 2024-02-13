const express = require("express");
const UserModel = require("../model/userModel");
const registerValidator = require("../middleware/registerValidator");
const loginValidator = require("../middleware/loginValidator");

const UserRouter = express.Router();

UserRouter.post("/register",registerValidator,async(req,res)=>{
    try{
        res.status(201).send({"msg":"User registration completed...."});
    }catch(error){
        res.status(500).send({"msg":error.message});
    }
});

UserRouter.post("/login",loginValidator,async(req,res)=>{
    try{
         res.status(200).send({"msg":"Login Successful..","accessToken":req.accessToken});
    }catch(error){
        res.status(500).send({"msg":error.message});
    }
})

module.exports = UserRouter ;

