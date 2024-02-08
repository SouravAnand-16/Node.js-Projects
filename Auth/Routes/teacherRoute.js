const express = require("express");
const cors = require("cors");
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
            res.status(200).send("Suggessfully logged in...");
        }catch(error){
            res.status(500).send("Error while logging");
        }
})

module.exports = teacherRouter ;