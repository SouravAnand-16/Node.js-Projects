const TeacherModel = require("../model/teacherModel");
const bcrypt = require("bcrypt");

const teacherLoginValidator = async(req,res,next)=>{
       const {email,pass} = req.body ;
       console.log(`Email is : ${email} and password is : ${pass}`);
       try{
            const teacher = await TeacherModel.findOne({email});
            console.log("Got existing teacher from DB :");
            if(!teacher){
                res.status(404).send(`Teacher doesn't exists with ${email}. Please do signup...!`);
            }else{
                console.log("calling compare password..");
                const hash = await comparePassword(pass,teacher.pass);
                console.log("comapared password and the result is :",hash);
                if(hash){
                    next();
                }else{
                    res.status(404).send("Wrong password....!");
                }
            }
            
       }catch(error){
            res.status(404).send("Error while logging..");
       }
}

const comparePassword = async(pass,dbpassword)=>{
    try{
        const result = await bcrypt.compare(pass,dbpassword);
        return result ;
    }catch(error){
        console.log(error);
    }
}

module.exports = teacherLoginValidator ;