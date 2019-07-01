
const Score = require('../models/score');
const scoreController = {};

// Handle index actions
scoreController.index = function (req, res) {
    Score.find()
    .populate('player')
    .populate('task')
    .populate('medal')
    .exec((err, scores) => {
        if (err) {
            res.json({
                success: false,
                message: "Scores could not be retrieved",
                error: err
            });
        }
        else res.json({
            success: true,
            message: "Scores retrieved successfully!",
            data: scores
        });
    });
};


// Handle create score actions
scoreController.new = function (req, res) {
    let score = new Score();
    score.player = req.body.player_id ? req.body.player_id : score.player;
    score.task = req.body.task_id ? req.body.task_id : score.task;
    score.score = req.body.score ? req.body.score : score.score;
    score.medal = req.body.medal_id ? req.body.medal_id : score.medal;
    score.comments = req.body.comments ? req.body.comments : score.comments;
    score.description = req.body.description ? req.body.description : score.description;
    score.save((err, saved_score) => {
        if (err) res.json({
            success: false,
            message: "Score could not be created",
            error: err
        });
        else res.json({
            success: true,
            message: "Score created successfully!",
            data: saved_score
        });
    });
};

module.exports = scoreController;
