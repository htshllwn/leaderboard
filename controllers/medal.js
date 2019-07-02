const mongoose = require('mongoose');
const Medal = mongoose.model('medal');
const medalController = {};

// Handle index actions
medalController.index = function (req, res) {
    Medal.find((err, medals) => {
        if (err) {
            res.json({
                success: false,
                message: "Medals could not be retrieved",
                error: err
            });
        }
        else res.json({
            success: true,
            message: "Medals retrieved successfully!",
            data: medals
        });
    });
};

// Handle create medal actions
medalController.new = function (req, res) {
    let medal = new Medal();
    medal.medal_name = req.body.medal_name ? req.body.medal_name : medal.medal_name;
    medal.multiplier = req.body.multiplier ? req.body.multiplier : medal.multiplier;
    medal.save((err, saved_medal) => {
        if (err) res.json({
            success: false,
            message: "Medal could not be created",
            error: err
        });
        else res.json({
            success: true,
            message: "Medal created successfully!",
            data: saved_medal
        });
    });
};

// Handle view medal info
medalController.view = function (req, res) {
    Medal.findById(req.params.medal_id, function (err, medal) {
        if (err || !medal) res.json({
            success: false,
            message: "Medal details could not be fetched",
            error: err
        });
        else res.json({
            success: true,
            message: 'Medal details fetched Successfully',
            data: medal
        });
    });
};

// Handle update medal info
medalController.update = function (req, res) {
    Medal.findById(req.params.medal_id, function (err, medal) {
        if (err || !medal) res.json({
            success: false,
            message: "Medal details not found for the requested id",
            error: err
        });
        medal.medal_name = req.body.medal_name ? req.body.medal_name : medal.medal_name;
        medal.multiplier = req.body.multiplier ? req.body.multiplier : medal.multiplier;
        // save the medal and check for errors
        medal.save((err, updated_medal) => {
            if (err) res.json({
                success: false,
                message: "Medal details could not be updated",
                error: err
            });
            else res.json({
                success: true,
                message: 'Medal details updated',
                data: updated_medal
            });
        });
    });
};

// Handle delete medal
// medalController.delete = function (req, res) {
//     Medal.remove({
//         _id: req.params.medal_id
//     }, function (err, medal) {
//         if (err) res.json({
//             success: false,
//             message: "medal does not exist or could not be deleted",
//             error: err
//         });
//         res.json({
//             success: true,
//             message: 'medal deleted successfully'
//         });
//     });
// };

module.exports = medalController;
