const bcrypt = require("bcrypt");

const UserModel = require("../models/userModel");

const saltRounds = parseInt(process.env.SaltRound) ;

const userRegisterValidator = async(req,res,next)=>{
    try{
        console.log(req.body);
        const {email,pass} = req.body ;
        console.log(`Email is : ${email}`);
        const user = await UserModel.findOne({email});
        const hashedPass = await convertPassword(pass);
        if(user){
            res.status(404).send(`user already exist with ${email}. Please do login...`);
        }else{
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