const express = require("express");
const cors = require("cors");
const StudentModel = require("../model/studentModel");
const studentValidator = require("../middleware/studentValidator")

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
            // const payload = req.body ;
            // console.log(payload);
            // const student = new StudentModel(payload);
            // await student.save();
            res.status(200).send("Registration successful");
        }catch(error){
           res.status(500).send("Error while registering");
        }
});

module.exports = studentRouter ;