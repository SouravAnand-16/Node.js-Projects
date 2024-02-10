const express = require("express");

const productRouter = express.Router() ;

productRouter.get("/",(req,res)=>{
    res.status(200).send({"msg":"All the products"});
})

module.exports = productRouter ;