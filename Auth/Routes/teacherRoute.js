const express = require("express");
const cors = require("cors");
const TeacherModel = require("../model/teacherModel");
const teacherValidator = require("../middleware/teacherValidator");

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
        const payload = req.body ;
        console.log(payload);
        const teacher = new TeacherModel(payload);
        await teacher.save();
        res.status(200).send("Registration successful");
    }catch(error){
       res.status(500).send("Error while registering");
    }
});

module.exports = teacherRouter ;