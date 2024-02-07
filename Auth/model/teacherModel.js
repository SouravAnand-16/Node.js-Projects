const mongoose = require("mongoose") ;

const teacherSchema = mongoose.Schema({
    name: String,
    sub: [String],
    experience: Number,
    email: String,
    pass: String
});

const TeacherModel = mongoose.model("teacher",teacherSchema);

module.exports = TeacherModel ;