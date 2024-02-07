const mongoose = require("mongoose") ;

const studentSchema = mongoose.Schema({
    name: String,
    age: Number,
    batch: String,
    email: String,
    pass: String,
});

const StudentModel = mongoose.model("student",studentSchema);

module.exports = StudentModel ;