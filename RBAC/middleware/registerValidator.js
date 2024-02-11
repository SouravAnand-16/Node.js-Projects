const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const saltRounds = 3 ;
const registerValidator = async(req,res,next)=>{
    try{
          const {email,pass} = req.body ;
          const user = await UserModel.findOne({email});
          if(user){
            return res.status(400).send(`User already exist with : ${email}. Please do log in...`);
          }
          const hash = await convertPassword(pass);
          const newUser = new UserModel({...req.body,pass:hash});
          await newUser.save();
          next();
    }catch(error){
        res.status(500).send({"msg":error.message});
    }
};

const convertPassword = async(pass)=>{
    try{
        const hash = await bcrypt.hash(pass,saltRounds);
        return hash ;
    }catch(error){
        res.status(500).send({"error":error.message});
    }
}

module.exports = registerValidator ;     