const StudentModel = require("../model/studentModel");
const studentValidator = async(req,res,next)=>{
  try{
       const {email} = req.body ;
       console.log(email);
       const student = await StudentModel.findOne({email});
       console.log(student);
       if(!student){
        console.log("calling next");
          next();
       }else{
           res.status(500).send(`Already exist with ${email}, Please do login in..`);
       }
  }catch(error){
     console.log(error);
  }
}

module.exports = studentValidator ;