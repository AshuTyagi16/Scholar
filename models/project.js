const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }],
    coordinator: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date,
        required: true
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports.Project = Project;