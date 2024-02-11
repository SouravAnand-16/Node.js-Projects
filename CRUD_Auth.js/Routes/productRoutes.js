const express = require("express");
const auth = require("../middleware/auth");

const productRouter = express.Router() ;

productRouter.post("/",auth,async(req,res)=>{
    try{
        res.status(200).send({"Hello,":req.username,"productsList":"all the products"});
    }catch(error){
        console.log("error while verifying token..",error);
    }
  
})

module.exports = productRouter ;