const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const TeacherModel = require("../model/teacherModel");
const teacherValidator = require("../middleware/teacherValidator");
const teacherLoginValidator = require("../middleware/teacherLoginValidator");

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
              const token = jwt.sign({"foo":"bar"},"masai");
              res.status(200).send({"email":email,"acessToken":token});
        }catch(error){
            res.status(500).send("Error while logging");
        }
})

teacherRouter.post("/teachers-data",(req,res)=>{
        try{
            const token = req.headers.authorization?.split(" ")[1] ;
            console.log(token);
            if(token===1234){
                    res.status(200).send({"message":"Token granted as well as Restricted Routed granted...."});
            }else{
                res.status(500).send({"message":"You are not Authorized...??"});
            }
        }catch(error){
            console.log("Error while verying token",error);
        }
})

module.exports = teacherRouter ;