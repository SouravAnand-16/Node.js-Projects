const StudentModel = require("../model/studentModel");
const bcrypt = require("bcrypt");

const studentLoginValidator = async(req,res,next)=>{
    try{
        const {email,pass} = req.body ;
        console.log(`Email is : ${email} and password is : ${pass}`);
        const student = await StudentModel.findOne({email});
        if(!student){
            res.status(500).send(`User doesn't exists with Email : ${email}. Please do Signup..!`);
        }else{
            
        }    
   }catch(error){
       res.status(500).send("Error while logging..");
   }
}

module.exports = studentLoginValidator ;