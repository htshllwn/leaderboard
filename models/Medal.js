const mongoose = require('mongoose');

// Schema
const medalSchema = mongoose.Schema({
    medal_name: {
        type: String,
        required: true
    },
    multiplier: {
        type: Number,
        required: true
    }
});

const Medal = mongoose.model('medal', medalSchema);

module.exports = Medal;
