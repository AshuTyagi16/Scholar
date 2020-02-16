const mongoose = require('mongoose');
const {modelChoicesJobState} = require('../constants');
const activitySchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Job'
    },
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    type: {
        type: Number,
        default: modelChoicesJobState.registered
    }
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports.Activity = Activity;