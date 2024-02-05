const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://127.0.0.1:27017/SuperTeam");

const superheroSchema = mongoose.Schema({
    name:String,
    alias:String,
    power:Number,
    role:String
});

const SuperheroModel = mongoose.model("Superhero",superheroSchema);

module.exports = {
    connection,
    SuperheroModel
};

