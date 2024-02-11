const roleAccess = (...permission)=>{
    return (req,res,next)=>{
        if(permission.includes(req.role)){
                next();
        }else{
            res.status(500).send({"msg":"You are not authorized"});
        }
    }
   
}

module.exports = roleAccess ;