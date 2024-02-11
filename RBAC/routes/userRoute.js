const express = require("express") ;

const registerValidator = require("../middleware/registerValidator");
const loginValidator = require("../middleware/loginValidator");

const UserRouter = express.Router();

UserRouter.post("/register",registerValidator,async(req,res)=>{
    try{
        res.status(200).send({"msg":"Registration done.."});
    }catch(error){
        res.status(500).send({"msg":error.message});
    }
});

UserRouter.post("/login",loginValidator,async(req,res)=>{
    try{
        res.status(201).send({"username":req.username,"accessToken":req.accessToken});
    }catch(error){
        res.status(500).send({"error":error.message});
    }
});





module.exports = UserRouter ;