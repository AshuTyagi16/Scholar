const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Company'
    },
    skill: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Skill'
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    visit_date: {
        type: Date,
        required: true
    }
}, {timestamps: true});

const Job = mongoose.model('Job', jobSchema);

module.exports.Job = Job;


