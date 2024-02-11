const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const userLoginvalidator = async(req,res,next)=>{
    try{
        const {email,pass} = req.body ;
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(401).send(`User doesn't exist with email : ${email}. Please do signup...`);
        }else{
            const comaparedPass = await bcrypt.compare(pass,user.pass);
            console.log("comapredPassword is :",comaparedPass);
            if(comaparedPass){
                req.userId = user._id ;
                req.username = user.username ;
                next();
            }else{
                res.status(401).send({"msg":"Wrong email or password..."});
            }
        }

    }catch(error){
        console.log("error while vaidating login...",error);
        res.status(401).send(error);
    }
}

module.exports = userLoginvalidator ;