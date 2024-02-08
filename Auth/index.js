const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connection  = require("./connection");
const studentRouter = require("./Routes/studentRoute");
const TeacherModel = require("./model/teacherModel");
const teacherRouter = require("./Routes/teacherRoute");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/student",studentRouter);
app.use("/teacher",teacherRouter);

app.get("/",(req,res)=>{
    res.status(200).send(`<h1>Welcom to home page. Congrats, you've successfully connected with MongoDB Atlas</h1>`);
})


app.listen(8080,async()=>{
    try{
        console.log(`Server is running at http://localhost:${8080}`);
        console.log("Server is connected to database");
    }catch(error){
        console.log(error);
    }
})
