const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const TeacherModel = require("../model/teacherModel");
const teacherValidator = require("../middleware/teacherValidator");
const teacherLoginValidator = require("../middleware/teacherLoginValidator");
const authorization = require("../middleware/authhorization");

const teacherRouter = express.Router() ;

teacherRouter.get("/",async(req,res)=>{
    try{
        const teacher = await TeacherModel.find();
        res.status(200).send({teacher});

    }catch(error){
        res.status(500).send("cannot fetch teacher data");
    }
})

teacherRouter.post("/register",teacherValidator,async(req,res)=>{
    try{
        res.status(200).send("Registration successful");
    }catch(error){
       res.status(500).send("Error while registering");
    }
});

teacherRouter.post("/login",teacherLoginValidator,async(req,res)=>{
        try{
              const {email} = req.body ;
              const teacher = await TeacherModel.findOne({email});
              console.log("teachers data:",teacher);
              const token = jwt.sign({"username":teacher.name},"masai");
              res.status(200).send({"email":email,"acessToken":token});
        }catch(error){
            res.status(500).send("Error while logging");
        }
})

teacherRouter.post("/teachers-data",authorization,(req,res)=>{
        try{
            const user = req.user ;
             res.status(200).send(`Hello , ${user.username} you have been authorized...!`);
        }catch(error){
            console.log("Error while verying token",error);
        }
})

module.exports = teacherRouter ;