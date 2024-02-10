const mongoose = require("mongoose") ;
require('dotenv').config();

const MongoURL = process.env.MongoURL ;

const connection = mongoose.connect(MongoURL);

module.exports = connection ;