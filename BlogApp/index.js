const express = require("express") ;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {connection} = require("./connection") ;
const {router} = require("./routes/blogRoutes");

const app = express() ;

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.status(200).send(`<h1>Welcome to Blogging App....</h1>`);
})

app.use("/blogApp",router);

app.listen(3000,async(req,res)=>{
    try{
        await connection ;
        console.log("Server got connected to DB");
        console.log(`Server is running at http://localhost:${3000}`);

    }catch(error){
        console.log("Error while connecting DB :",error);
    }
})