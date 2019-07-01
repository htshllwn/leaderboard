const Player = require('../models/Player');
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
