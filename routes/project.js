const express = require('express');
const router = express.Router();
const {assignProject, updateProgress, getMyProject} = require('../controllers/project_controller');
const {genericErrorCodes} = require('../constants');

router.post('/assignproject', (req, res) => {
    const faculty = req.query.faculty;
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

    assignProject(members, faculty, dateTime, title, description)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(err))
});

router.post('/updateProgress', (req, res) => {
    const progress = req.query.progress;
    const project = req.query.project;
    updateProgress(project, progress)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(err))
});

router.get('/getMyProject', (req, res) => {
    const user = req.query.user;
    getMyProject(user)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(err))
});

module.exports = router;