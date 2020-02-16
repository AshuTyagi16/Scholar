const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Subject'
    }]
}, {timestamps: true});

const Branch = mongoose.model('Branch', branchSchema);

module.exports.Branch = Branch;