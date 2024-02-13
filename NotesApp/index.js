const express = require("express");
require("dotenv").config();
const connection = require("./connection");
const UserRouter = require("./routes/userRoute");

const PORT = process.env.PORT ;

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Welcome to home page"});
})

app.use("/user",UserRouter);

app.listen(PORT,async(req,res)=>{
    try{
        await connection ;
        console.log('Server is connected to DB');
        console.log(`Server is running at http://localhost:${PORT}`);
    }catch(error){
        res.status(500).send({"msg":error.message});
    }
  
});