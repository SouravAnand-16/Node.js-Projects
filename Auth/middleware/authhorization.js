const jwt = require("jsonwebtoken");

const authorization = async(req,res,next)=>{
     try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).send("Token mismatch....!");
        }
        const decode = jwt.verify(token,"masai");
        console.log("decoded :",decode);
         req.user = decode ;
        next();
     }catch(error){
        res.status(404).send("Error while token verification");
     }

}

module.exports = authorization ;