const express = require('express');
const router = express.Router();
const {login} = require('../controllers/user_controller');
const {genericErrorCodes} = require('../constants');
const {sendError} = require('../controllers/error_controller');

router.get('/login', (req, res) => {
    const email = req.query.email;
    const name = req.query.name;
    const avatar_url = req.query.avatar_url;
    login(email, name, avatar_url)
        .then((result) => res.status(genericErrorCodes.success).send(result))
        .catch(err => res.status(err.code).send(sendError(err.code, err.name, err.message)))
});

module.exports = router;