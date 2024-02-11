const mongoose = require('mongoose');


const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['access', 'refresh'],
        required: true
    }
});


const BlacklistModel = mongoose.model('blacklist', TokenSchema);

module.exports = BlacklistModel;