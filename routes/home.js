const express = require('express');
const router = express.Router();
const {genericErrorCodes} = require('../constants');
const {
    getAllBranches, getAllSubjects, getAllSkills,
    addSubject, addSkill, addBranch,
    searchSkill, getCompanyById
} = require('../controllers/home_controller');
const {sendError} = require('../controllers/error_controller');
const verifyUser = require('../middleware/verify_user');

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

router.get('/company', (req, res) => {
    getCompanyById(req.query.company)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(err))
});

router.post('/subject', verifyUser, (req, res) => {
    const subjectName = req.query.subject_name;
    addSubject(subjectName)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.post('/skill', verifyUser, (req, res) => {
    const skillName = req.query.skill_name;
    addSkill(skillName)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.post('/branch', verifyUser, (req, res) => {
    const branchName = req.query.branch_name;
    let subjects = [];
    if (req.query.subjects && req.query.subjects.trim().length > 0) {
        subjects = req.query.subjects.split(",").map(id => {
            if (id.trim().length === 24) {
                return id.trim();
            }
        });
    }
    addBranch(branchName, subjects)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

router.get('/searchSkill', (req, res) => {
    const text = req.query.text;
    searchSkill(text)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(genericErrorCodes.someErrorOccurred).send(sendError(err.code, err.name, err.message)))
});

module.exports = router;