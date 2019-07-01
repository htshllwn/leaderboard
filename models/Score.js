const mongoose = require('mongoose');

// Schema
const scoreSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    medal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medal'
    },
    comments: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    }
});

const Score = mongoose.model('score', scoreSchema);

module.exports = Score;
