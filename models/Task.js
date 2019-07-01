const mongoose = require('mongoose');

// Schema
const taskSchema = mongoose.Schema({
    task_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    discontinued: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
