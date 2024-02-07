const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://sourav:anand@cluster0.oixi3wp.mongodb.net/AuthDay1?retryWrites=true&w=majority");


module.exports = connection ;