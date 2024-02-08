const TeacherModel = require("../model/teacherModel");
const bcrypt = require("bcrypt");

const saltRounds = 5 ;
const teacherValidator = async(req,res,next)=>{
  try{
       const {email,pass,...payload} = req.body ;
       const payloads = JSON.stringify(payload);
       console.log(`Email is : ${email} and password is : ${pass} and payload is : ${payloads}`);
       const teacher = await TeacherModel.findOne({email});
       console.log("Got existing teacher from DB:",teacher);
       console.log("calling password convertor");
       const hashedPassword = await passConverter(pass);
       console.log("Got hashed password : ");
       if(!teacher){
          const teacher = new TeacherModel({...req.body,pass:hashedPassword});
          await teacher.save();
          console.log("Saved new teacher into DB");
          console.log("calling next");
          next();
       }else{
           res.status(500).send(`Already exist with ${email}, Please do login in..`);
       }
  }catch(error){
     console.log(error);
  }
}

const passConverter = async(pass)=>{
        try{
            const hash = bcrypt.hashSync(pass,saltRounds);
            console.log("Hashed password is : ",hash);
            return hash ;
        }catch(error){
             console.log(error);
        }
}
module.exports = teacherValidator ;        