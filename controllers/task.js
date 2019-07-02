const mongoose = require('mongoose');
const Task = mongoose.model('task');
const taskController = {};

// Handle index actions
taskController.index = function (req, res) {
    Task.find((err, tasks) => {
        if (err) {
            res.json({
                success: false,
                message: "Tasks could not be retrieved",
                error: err
            });
        }
        else res.json({
            success: true,
            message: "Tasks retrieved successfully!",
            data: tasks
        });
    });
};

// Handle create task actions
taskController.new = function (req, res) {
    let task = new Task();
    task.task_name = req.body.task_name ? req.body.task_name : task.task_name;
    task.description = req.body.description ? req.body.description : task.description;
    task.save((err, saved_task) => {
        if (err) res.json({
            success: false,
            message: "Task could not be created",
            error: err
        });
        else res.json({
            success: true,
            message: "Task created successfully!",
            data: saved_task
        });
    });
};

// Handle view task info
taskController.view = function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err || !task) res.json({
            success: false,
            message: "Task details could not be fetched",
            error: err
        });
        else res.json({
            success: true,
            message: 'Task details fetched Successfully',
            data: task
        });
    });
};

// Handle update task info
taskController.update = function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err || !task) res.json({
            success: false,
            message: "Task details not found for the requested id",
            error: err
        });
        task.task_name = req.body.task_name ? req.body.task_name : task.task_name;
        task.description = req.body.description ? req.body.description : task.description;
        task.discontinued = req.body.discontinued != null && req.body.discontinued != undefined ?
            req.body.discontinued : task.discontinued;
            
        // save the task and check for errors
        task.save((err, updated_task) => {
            if (err) res.json({
                success: false,
                message: "Task details could not be updated",
                error: err
            });
            else res.json({
                success: true,
                message: 'Task details updated',
                data: updated_task
            });
        });
    });
};

// Handle delete task
// taskController.delete = function (req, res) {
//     Task.remove({
//         _id: req.params.task_id
//     }, function (err, task) {
//         if (err) res.json({
//             success: false,
//             message: "task does not exist or could not be deleted",
//             error: err
//         });
//         res.json({
//             success: true,
//             message: 'task deleted successfully'
//         });
//     });
// };

module.exports = taskController;
