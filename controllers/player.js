const mongoose = require('mongoose');
const Player = mongoose.model('player');
const Score = mongoose.model('score');
const playerController = {};

// Handle index actions
playerController.index = function (req, res) {
    Player.find((err, players) => {
        if (err) {
            res.json({
                success: false,
                message: "Players could not be retrieved",
                error: err
            });
        }
        else res.json({
            success: true,
            message: "Players retrieved successfully!",
            data: players
        });
    });
};

// Handle create Player actions
playerController.new = function (req, res) {
    let player = new Player();
    player.player_name = req.body.player_name ? req.body.player_name : player.player_name;
    player.save((err, saved_player) => {
        if (err) res.json({
            success: false,
            message: "Player could not be created",
            error: err
        });
        else res.json({
            success: true,
            message: "Player created successfully!",
            data: saved_player
        });
    });
};

// Handle view Player info
playerController.view = function (req, res) {
    Player.findById(req.params.player_id, function (err, player) {
        if (err || !player) res.json({
            success: false,
            message: "Player details could not be fetched",
            error: err
        });
        else res.json({
            success: true,
            message: 'Player details fetched Successfully',
            data: player
        });
    });
};

// Handle update Player info
playerController.update = function (req, res) {
    Player.findById(req.params.player_id, function (err, player) {
        if (err || !player) res.json({
            success: false,
            message: "Player details not found for the requested id",
            error: err
        });
        player.player_name = req.body.player_name ? req.body.player_name : player.player_name;
        player.discontinued = req.body.discontinued != null && req.body.discontinued != undefined ?
            req.body.discontinued : player.discontinued;
        // save the player and check for errors
        player.save((err, updated_player) => {
            if (err) res.json({
                success: false,
                message: "Player details could not be updated",
                error: err
            });
            else res.json({
                success: true,
                message: 'Player details updated',
                data: updated_player
            });
        });
    });
};

// Handle players' score info
playerController.scores = function (req, res) {
    let start_date = req.body.start_date
        ? new Date(req.body.start_date + " 00:00")
        : new Date("7.1.2018 00:00");
    let end_date = req.body.end_date
        ? new Date(req.body.end_date + " 23:59")
        : new Date();
    let playerFindOptions = {};
    if (req.body.player_id != "" && req.body.player_id != null && req.body.player_id != undefined) {
        playerFindOptions._id = req.body.player_id;
    }
    Player.find(playerFindOptions).exec(async (err, players) => {
        if (err) {
            res.json({
                success: false,
                message: "Players could not be retrieved",
                error: err
            });
        }
        else {
            let playersWithScores = [];
            for (let i = 0; i < players.length; i++) {
                const player = players[i];
                let score = 0;
                let scores = await Score.find({
                    player: player._id,
                    date: {
                        $gte: start_date,
                        $lte: end_date
                    }
                })
                    .populate('medal')
                    .exec();
                scores.forEach(s => score += (s.score * s.medal.multiplier));
                player._doc.score = score;
                playersWithScores.push(player);
            }
            playersWithScores = playersWithScores.sort((a, b) => b.score - a.score);
            res.json({
                success: true,
                message: "Players with scores retrieved successfully!",
                data: playersWithScores
            });
        }

    });
}

// Handle delete player
// playerController.delete = function (req, res) {
//     Player.remove({
//         _id: req.params.player_id
//     }, function (err, player) {
//         if (err) res.json({
//             success: false,
//             message: "Player does not exist or could not be deleted",
//             error: err
//         });
//         res.json({
//             success: true,
//             message: 'Player deleted successfully'
//         });
//     });
// };

module.exports = playerController;
