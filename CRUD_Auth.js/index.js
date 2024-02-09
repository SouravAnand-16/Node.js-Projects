const express = require("express") ;
const cors = require("cors");
const {connection} = require("./connection");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000,async()=>{
    try{
        await connection ;
        console.log("Server got connection to Database");
        console.log(`Server is running at : http://localhost:${3000}`);
    }catch(error){
        console.log("Error while connecting to DB:",error);
    }
})