const express = require('express');
const router = express.Router();
const {genericErrorCodes} = require('../constants');
const {getAllBranches, getAllSubjects, getAllSkills, addSubject, addSkill} = require('../controllers/home_controller');
const {sendError} = require('../controllers/error_controller');

router.get('/branch', (req, res) => {
    getAllBranches()
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(err))
});

router.get('/subject', (req, res) => {
    getAllSubjects()
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(err))
});

router.get('/skill', (req, res) => {
    getAllSkills()
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(err))
});

router.post('/subject', (req, res) => {
    const subjectName = req.query.subject_name;
    addSubject(subjectName)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.post('/skill', (req, res) => {
    const skillName = req.query.skill_name;
    addSkill(skillName)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

module.exports = router;