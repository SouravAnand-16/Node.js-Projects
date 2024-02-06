const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    genre: [String],
    director: {
      type: String,
      required: true,
    },
    actors: [String],
 });

const MovieModel = mongoose.model("Movie",movieSchema);

module.exports = MovieModel ;