const express = require('express');
const router = express.Router();
const {login, updateUser, findUser} = require('../controllers/user_controller');
const {genericErrorCodes} = require('../constants');
const {sendError} = require('../controllers/error_controller');

router.get('/login', (req, res) => {
    const email = req.query.email;
    const name = req.query.name;
    const avatar_url = req.query.avatar_url;
    const userType = req.query.userType;
    login(email, name, avatar_url, userType)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(err.code).send(sendError(err.code, err.name, err.message)))
});

router.get('/updateUser', (req, res) => {
    const userId = req.query.userId;
    const age = req.query.age;
    const branch = req.query.branch;
    const userType = req.query.userType;
    const section = req.query.section;
    const semester = req.query.semester;
    const playerId = req.query.playerId;
    let skills = [];
    if (req.query.skills && req.query.skills.trim().length > 0) {
        skills = req.query.skills.split(",").map(id => {
            return id.trim();
        });
    }
    updateUser(userId, age, branch, userType, section, semester, skills, playerId)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(err.code).send(sendError(err.code, err.name, err.message)))
});

router.get('/find', (req, res) => {
    findUser(req.query.name)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(err.code).send(err))
});

module.exports = router;