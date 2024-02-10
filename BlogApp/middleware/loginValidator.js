const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const loginValidator = async(req,res,next)=>{
    try{
        const {email,pass} = req.body ;
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(500).send({"msg":"You are not registerd....Please do singup...!"});
        }else{
            const comparedPass = await comparePass(pass,user.pass);
            console.log("Compared password and the result is :",comparedPass);   
            if(comparedPass){
                next();
            }else{
                res.status(201).send("Wrong email or password...");
            }
        }

    }catch(error){
        console.log("Error in validation while logging..",error);
    }
};

const comparePass = async(pass,dbpass)=>{
    try{
        const result = await bcrypt.compare(pass,dbpass);
        return result ;

    }catch(error){
        console.log("Error while comapring password....",error);
    }
}

module.exports = loginValidator ;