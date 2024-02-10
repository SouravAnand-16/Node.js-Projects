
const express = require("express");
const userRegisterValidator = require("../middleware/userRegisterValidator");

const userRouter = express.Router();

userRouter.post("/register",userRegisterValidator,async(req,res)=>{
    try{
        res.status(200).send("Registration successful");
    }catch(error){
        console.log("Error while creating new user!");
    }
});

module.exports = userRouter ;