const express = require('express');
const router = express.Router();
const {getLiveSchedule, getUpcomingSchedule, getPastSchedule, addJob, addCompany, getAllCompanies} = require('../controllers/placement_controller');
const {sendError} = require('../controllers/error_controller');
const {genericErrorCodes} = require('../constants');

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

router.post('/job', (req, res) => {
    const companyId = req.query.company;
    const title = req.query.title;
    const description = req.query.description;
    const place = req.query.place;
    let skills = [];
    if (req.query.skills && req.query.skills.trim().length > 0) {
        skills = req.query.skills.split(",").map(id => {
            if (id.trim().length === 24) {
                return id.trim();
            }
        });
    }
    addJob(companyId, skills, title, description, place)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.post('/company', (req, res) => {
    const name = req.query.name;
    const website = req.query.website;
    const logo = req.query.logo;
    addCompany(name, website, logo)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

module.exports = router;