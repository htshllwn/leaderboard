const mongoose = require('mongoose');
const Score = mongoose.model('score');
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

// Handle view score info
scoreController.view = function (req, res) {
    Score.findById(req.params.score_id)
        .populate('player')
        .populate('task')
        .populate('medal')
        .exec((err, score) => {
            if (err || !score) res.json({
                success: false,
                message: "Score details could not be fetched",
                error: err
            });
            else res.json({
                success: true,
                message: 'Score details fetched Successfully',
                data: score
            });
        });
};

// Handle update score info
scoreController.update = function (req, res) {
    Score.findById(req.params.score_id, function (err, score) {
        if (err || !score) res.json({
            success: false,
            message: "Score details not found for the requested id",
            error: err
        });

        score.player = req.body.player_id ? req.body.player_id : score.player;
        score.task = req.body.task_id ? req.body.task_id : score.task;
        score.score = req.body.score ? req.body.score : score.score;
        score.medal = req.body.medal_id ? req.body.medal_id : score.medal;
        score.comments = req.body.comments ? req.body.comments : score.comments;
        score.description = req.body.description ? req.body.description : score.description;

        // save the score and check for errors
        score.save((err, updated_score) => {
            if (err) res.json({
                success: false,
                message: "Score details could not be updated",
                error: err
            });
            else Score.populate(updated_score, [
                { path: 'player' },
                { path: 'task' },
                { path: 'medal' }
            ], (err, populated_score) => {
                if (err) res.json({
                    success: false,
                    message: "Score details could not be populated",
                    error: err
                });
                else res.json({
                    success: true,
                    message: 'Score details updated',
                    data: populated_score
                });
            });
        });
    });
};

// Handle delete score
scoreController.delete = function (req, res) {
    Score.findByIdAndDelete(req.params.score_id, (err, score) => {
        if (err) res.json({
            success: false,
            message: "Score does not exist or could not be deleted",
            error: err
        });
        res.json({
            success: true,
            message: 'Score deleted successfully'
        });
    });
};

module.exports = scoreController;
