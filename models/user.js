const mongoose = require('mongoose');
const {userType} = require('../constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar_url: {
        type: String
    },
    age: {
        type: Number
    },
    branch: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Branch'
    },
    user_type: {
        type: Number,
        default: userType.student
    },
    section: {
        type: String
    },
    semester: {
        type: Number
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Skill'
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Subject'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports.User = User;