const {User} = require('../models/user');
const {loginErrorCodes, loginErrorMessage, genericErrorCodes, genericErrorMessage} = require('../constants');

async function login(email, name, avatar_url) {
    try {
        if (!email) throw {
            code: loginErrorCodes.emailNotProvided,
            name: loginErrorMessage.emailNotProvided,
            message: loginErrorMessage.emailNotProvided
        };
        if (!name) throw {
            code: loginErrorCodes.nameNotProvided,
            name: loginErrorMessage.nameNotProvided,
            message: loginErrorMessage.nameNotProvided
        };
        let user = await User.findOne({email: email});
        if (user)
            return user;
        else {
            user = new User({
                name: name,
                email: email,
                avatar_url: avatar_url
            });
            user = await user.save();
            if (!user) throw {
                code: genericErrorCodes,
                name: genericErrorMessage.someErrorOccurred,
                message: genericErrorMessage.someErrorOccurred
            };
            return user;
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    login
};