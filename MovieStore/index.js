const express = require("express");
const mongoose = require("mongoose") ;
const connection = require("./connection");
const router = require("./Routes/movieRoutes");

const app = express() ;
app.use(express.json());

app.use("/movie",router);

app.listen(3000,async()=>{
    try{
        await connection ;
        console.log(`Server is running at http://localhost:${3000}`);
        console.log("Connected to database");

    }catch(error){
       console.log("Error:",error);
    }
})
