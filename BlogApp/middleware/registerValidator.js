const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const saltRounds = 6 ;

const registerValidator = async(req,res,next)=>{
         try{
            const {email,pass} = req.body ;
            console.log(`Email is : ${email} and pass is : ${pass} for registering.`);
            const user = await UserModel.findOne({email});
            console.log(`Got existing user from DB : ${user}`);
            if(user){
               res.status(500).send(`User already exist with ${email}.Please do login....!`);
            }else{
               const hashedpass = await passConvertor(pass);
               console.log(`Got hashed password`);
               const newUser = new UserModel({...req.body,pass:hashedpass});
               await newUser.save();
               console.log(`Saved newUser as : ${newUser}`);
               console.log(`Calling next...`);
               next();
            }

         }catch(error){
            console.log("Error while validating user during registration");
         }
}

const passConvertor = async(pass)=>{
   try{
      console.log("passConvertor called and conevrting pass");
      const hash = bcrypt.hashSync(pass,saltRounds);
      return hash ;
   }catch(error){
      console.log("Error while conevrting password");
   }
}

module.exports = registerValidator ;