const StudentModel = require("../model/studentModel");
const bcrypt = require("bcrypt");

const studentLoginValidator = async(req,res,next)=>{
    try{
        const {email,pass} = req.body ;
        console.log(`Email is : ${email} and password is : ${pass}`);
        const student = await StudentModel.findOne({email});
        if(!student){
            res.status(404).send(`User doesn't exists with Email : ${email}. Please do Signup..!`);
        }else{
            const hash = await comparePassword(pass,student.pass);
            console.log(hash);
            if(hash){
                    next() ;
            }else{
                res.status(401).send({"message":"Sorry wrong password...!"});
            }
        }    
   }catch(error){
       res.status(500).send("Error while logging..");
   }
}

const comparePassword =async(pass,hash)=>{
        try{
            const result = await bcrypt.compare(pass,hash);
            return result ;
        }catch(error){
            console.error("Error comparing passwords:", error);
        }
}

module.exports = studentLoginValidator ;