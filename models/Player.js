const mongoose = require('mongoose');

// Schema
const playerSchema = mongoose.Schema({
    player_name: {
        type: String,
        required: true
    },
    discontinued: {
        type: Boolean,
        default: false
    }
});

const Player = mongoose.model('player', playerSchema);

module.exports = Player;
