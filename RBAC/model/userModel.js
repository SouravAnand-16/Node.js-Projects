const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String
    },
    role:{
        type:String,
        enum:["SuperAdmin","Admin","User"],
        default:"User"
    }
},{
    versionKey:false 
});

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel ;