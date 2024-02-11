const UserModel = require("../model/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY ;

const loginValidator = async(req,res,next)=>{
    try{
        const {email,pass} = req.body ;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).send(`Sorry user with ${email} doesn't exist. Please do signup...`);
        }
        const comparedPass = bcrypt.compare(pass,user.pass);
        if(!comparedPass){
            return res.status(400).send({"msg":"Wrong email or password..."});
        }
        const accessToken = jwt.sign({"username":user.username,"email":user.email,"userId":user._id,"role":user.role},secretKey,{expiresIn:300});
        req.accessToken = accessToken ;
        req.username = user.username ;
        next();
    }catch(error){
        res.status(500).send({"error":error.message});
    }
};

module.exports = loginValidator ;