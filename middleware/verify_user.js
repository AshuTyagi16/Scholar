const {User} = require('../models/user');
const {genericErrorCodes, genericErrorMessage, userType, userErrorCodes, userErrorMessage} = require('../constants');

async function verifyUser(req, res, next) {
    let user = req.query.userId;
    if (!user) res.status(genericErrorCodes.someErrorOccurred).send({
        code: userErrorCodes.noUserIdProvided,
        name: userErrorMessage.noUserIdProvided,
        message: userErrorMessage.noUserIdProvided
    });
    user = await User.findOne({_id: user});
    if (!user) res.status(genericErrorCodes.someErrorOccurred).send({
        code: userErrorCodes.noUserIdProvided,
        name: userErrorMessage.noUserIdProvided,
        message: userErrorMessage.noUserIdProvided
    });
    if (user.user_type !== userType.admin) {
        res.status(genericErrorCodes.someErrorOccurred).send({
            code: userErrorCodes.userNotAuthorized,
            name: userErrorMessage.userNotAuthorized,
            message: userErrorMessage.userNotAuthorized
        })
    }
    next()
}

module.exports = verifyUser;