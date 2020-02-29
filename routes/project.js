const express = require('express');
const router = express.Router();
const {assignProject} = require('../controllers/project_controller');
const {sendError} = require('../controllers/error_controller');

router.get('/assign_project', (req, res) => {
    const coordinater = req.query.coordinator;
    const deadline = req.query.deadline;
    const title = req.query.title;
    const description = req.query.description;
    let members = [];
    if (req.query.members && req.query.members.trim().length > 0) {
        members = req.query.members.split(",").map(id => {
            return id.trim();
        });
    }

    assignProject(members, coordinater, deadline, title, description)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

module.exports = router;