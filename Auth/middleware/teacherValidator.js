const TeacherModel = require("../model/teacherModel");
const teacherValidator = async(req,res,next)=>{
  try{
       const {email} = req.body ;
       console.log(email);
       const teacher = await TeacherModel.findOne({email});
       console.log(teacher);
       if(!teacher){
        console.log("calling next");
          next();
       }else{
           res.status(500).send(`Already exist with ${email}, Please do login in..`);
       }
  }catch(error){
     console.log(error);
  }
}

module.exports = teacherValidator ;