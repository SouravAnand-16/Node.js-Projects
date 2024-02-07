const express = require("express");
const cors = require("cors");
const StudentModel = require("../model/studentModel");
const studentValidator = require("../middleware/studentValidator")
const studentLoginValidator = require("../middleware/studentLoginValidator");

const studentRouter = express.Router() ;

studentRouter.get("/",async(req,res)=>{
    try{
        const student = await StudentModel.find();
        res.status(200).send({student});
    }catch(error){
        res.status(500).send("cannot fetch student data");
    }
})

studentRouter.post("/register",studentValidator,(req,res)=>{
        try{
            res.status(200).send("Registration successful");
        }catch(error){
           res.status(500).send("Error while registering");
        }
});

studentRouter.post("/login",studentLoginValidator,async(req,res)=>{
       try{
        res.status(200).send("Logged in Successfully");
            
       }catch(error){
            res.status(500).send("Error while logging !");
       }
})

module.exports = studentRouter ;