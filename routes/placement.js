const express = require('express');
const router = express.Router();
const {getLiveSchedule, getUpcomingSchedule, getPastSchedule, addJob, addCompany, getAllCompanies, applyJob} = require('../controllers/placement_controller');
const {sendError} = require('../controllers/error_controller');
const {genericErrorCodes} = require('../constants');
const verifyUser = require('../middleware/verify_user');

router.get('/schedule/live', (req, res) => {
    const userId = req.query.userId;
    getLiveSchedule(userId)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.get('/schedule/upcoming', (req, res) => {
    const userId = req.query.userId;
    getUpcomingSchedule(userId)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.get('/schedule/past', (req, res) => {
    const userId = req.query.userId;
    getPastSchedule(userId)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.get('/company', (req, res) => {
    getAllCompanies()
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.post('/job', verifyUser, (req, res) => {
    const companyId = req.query.company;
    const title = req.query.title;
    const description = req.query.description;
    const place = req.query.place;
    let skills = [];
    const date = req.query.date;
    const month = req.query.month;
    const year = req.query.year;
    const hour = req.query.hour;
    const minute = req.query.minute;
    const dateTime = new Date(year, month - 1, date);
    dateTime.setHours(hour, minute, 0, 0);
    if (req.query.skills && req.query.skills.trim().length > 0) {
        skills = req.query.skills.split(",").map(id => {
            return id.trim();
        });
    }
    addJob(companyId, skills, title, description, place, dateTime)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.post('/company', verifyUser, (req, res) => {
    const name = req.query.name;
    const website = req.query.website;
    const logo = req.query.logo;
    addCompany(name, website, logo)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.post('/job/apply', (req, res) => {
    const user = req.query.userId;
    const job = req.query.job;
    applyJob(user, job)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});
module.exports = router;