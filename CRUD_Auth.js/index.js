const express = require("express") ;
require("dotenv").config();
const cors = require("cors");
const {connection} = require("./connection");
const productRouter = require("./Routes/productRoutes");
const userRouter = require("./Routes/userRoute");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"This is home page"});
});

app.use("/user",userRouter); 
app.use("/product",productRouter);



app.listen(3000,async()=>{
    try{
        await connection ;
        console.log("Server got connection to Database");
        console.log(`Server is running at : http://localhost:${3000}`);
    }catch(error){
        console.log("Error while connecting to DB:",error);
    }
})