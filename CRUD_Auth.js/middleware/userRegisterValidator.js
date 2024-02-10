
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const saltRounds = process.env.SaltRound ;

const userRegisterValidator = async(req,res,next)=>{
    try{
        const { email,pass } = req.body ;
        console.log(`Email is : ${email} and password is : ${pass}`);
        const user = await UserModel.findOne({email});
        if(user){
            res.status(404).send(`user already exist with ${email}. Please do login...`);
        }else{
            const hashedPass = await convertPassword(pass);
            const user = new UserModel({...req.body,pass:hashedPass}); 
            await user.save();
            next();
        }

    }catch(error){
        console.log("Error while validating for newUser registration:",error);
    }
};

const convertPassword = async(pass)=>{
    try{
        const hash = bcrypt.hashSync(pass,saltRounds);
        return hash ;
    }catch(error){
        console.log("Error while converting password..");
    }
}

module.exports = userRegisterValidator ;