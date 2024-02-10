const jwt = require("jsonwebtoken");

const verifyToken = async(req,res,next)=>{
    try{
        const accessToken = req.cookies.accessToken ;
        const refreshToken = req.cookies.refreshToken ;
        console.log(`accessToken : ${accessToken} and RefreshToken : ${refreshToken}`);
        if(!accessToken && !refreshToken ){
            res.status(201).send({"msg":"You are not authorized"});
        }else{
            if(accessToken){
                const decode = jwt.verify(accessToken,"xyz133@#");
                req.user = decode ;
                return next();
            }
            if(refreshToken){
                const decode = jwt.verify(refreshToken,"cgh12567#45");
                req.user = decode ;
                return next();
            }
        }

    }catch(error){
        console.log("Error while verifying token..",error);
    }
}
module.exports = verifyToken ;