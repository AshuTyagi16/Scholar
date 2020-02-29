const express = require('express');
const router = express.Router();
const {assignProject} = require('../controllers/project_controller');
const {sendError} = require('../controllers/error_controller');

router.post('/assign_project', (req, res) => {
    const coordinator = req.query.coordinator;
    const title = req.query.title;
    const description = req.query.description;
    let members = [];
    const date = req.query.date;
    const month = req.query.month;
    const year = req.query.year;
    const dateTime = new Date(year, month - 1, date);
    if (req.query.members && req.query.members.trim().length > 0) {
        members = req.query.members.split(",").map(id => {
            return id.trim();
        });
    }

    assignProject(members, coordinator, dateTime, title, description)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

module.exports = router;