const express = require("express");
const mongoose = require("mongoose");
const {connection,SuperheroModel} = require("./databaseConnection");
const superheroRouter = require("./routes/superheroRoutes");

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
     res.setHeader("Content-Type", "text/html");
     res.status(200).send("<html><body><h1>Welcome to Super team, How can we help you</h1></body></html>");
})

app.use("/superhero",superheroRouter);
app.use("/superhero/:id",superheroRouter);
app.listen(3000,async()=>{
  try{
    await connection ;
    console.log(`Server is running at http://localhost:${3000}`);
  }catch(error){
    console.log(error);
  }
})