const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./connection");
const UserRouter = require("./routes/userRoute");
const UserModel = require("./model/userModel");
const auth = require("./middleware/auth");
const roleAccess = require("./middleware/roleAcess");

const PORT = process.env.PORT ;
const app = express();

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Hello, this is a Home page"});
});

app.use("/user",UserRouter);

app.delete("/user/:id",auth,roleAccess("SuperAdmin","Admin"),async(req,res)=>{
    try{
        console.log("role is :",req.role);
        const userId = req.params.id ;
        console.log("userid is :",userId);
        await UserModel.findByIdAndDelete(userId);
        res.status(200).send({"msg":"User deleted successfully..."});
    }catch(error){
        res.status(500).send({"error":error.message});
    }
});


app.listen(PORT,async(req,res)=>{
    try{
       await connection
        console.log("Server connected to DB");
        console.log(`Server is running at : http://localhost:${PORT}`)
    }catch(error){
       console.log(error);
    }
})