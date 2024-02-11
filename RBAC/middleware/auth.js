const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY ;
const auth = async(req,res,next)=>{
    try{
        const accessToken = req.headers.authorization?.split(" ")[1];
        if(accessToken){
            const decode = jwt.verify(accessToken,secretKey);
             console.log(decode);
             req.role = decode.role ;
             next();
        }else{
            res.status(500).send({"msg":"Not authorized..."});
        }
    }catch(error){
        res.status(500).send({"error":error.message});
    }
}

module.exports = auth ;