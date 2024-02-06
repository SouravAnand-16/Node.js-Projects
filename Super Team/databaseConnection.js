const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://sourav:anand@cluster0.oixi3wp.mongodb.net/SuperTeam?retryWrites=true&w=majority");

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

