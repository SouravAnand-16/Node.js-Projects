const express = require("express");
const UserModel = require("../models/userModel");
const registerValidator = require("../middleware/registerValidator");
const loginValidator = require("../middleware/loginValidator");

const router = express.Router();

router.post("/register",registerValidator,async(req,res)=>{
   try{
       
       res.status(200).send("Registration success");

   }catch(error){
    console.log("Error while registring new user...",error);
   }
});

router.post("/login",loginValidator,async(req,res)=>{
    try{
        res.status(200).send("Successfully logged in.....");

    }catch(error){
        console.log("Error while logging ...");
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



module.exports = router ;