const StudentModel = require("../model/studentModel");
const bcrypt = require("bcrypt");

const saltRounds = 5 ;
const studentValidator = async(req,res,next)=>{
        const {email,pass,...payload} = req.body ;
        const payloads = JSON.stringify(payload);
  try{
       console.log(`Email is : ${email} and password is : ${pass} and payload is : ${payloads}`);
       const student = await StudentModel.findOne({email});
       console.log("Got existing student from DB:",student);
       console.log("calling password convertor");
       const hashedPassword = await passCoverter(pass);
       console.log("Got hashed password");
       if(!student){
          const student = new StudentModel({...req.body,pass:hashedPassword});
          await student.save();
          console.log("Saved new student to the database");
          console.log("calling next");
          next();
       }else{
           res.status(500).send(`Already exist with ${email}, Please do login in..`);
       }
  }catch(error){
     console.log(error);
  }
}

const passCoverter = async(pass)=>{
         try{
            const hash = bcrypt.hashSync(pass, saltRounds);
            console.log("Hashed password is : ",hash);
            return hash ;
         }catch(error){
              console.log(error);
         }
}

module.exports = studentValidator ;   