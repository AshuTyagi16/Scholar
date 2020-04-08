const {User} = require('../models/user');
const {
    loginErrorCodes, loginErrorMessage,
    genericErrorCodes, genericErrorMessage,
    userErrorCodes, userErrorMessage
} = require('../constants');

async function login(email, name, avatar_url, userType) {
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
                avatar_url: avatar_url,
                user_type: userType
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

async function updateUser(userId, age, branch, userType, section, semester, skills, playerId) {
    try {
        console.log("UID : " + userId);
        if (!userId) throw {
            code: userErrorCodes.noUserIdProvided,
            name: userErrorMessage.noUserIdProvided,
            message: userErrorMessage.noUserIdProvided
        };
        let user = await User.findOne({_id: userId});
        if (!user) throw {
            code: userErrorCodes.userNotFound,
            name: userErrorMessage.userNotFound,
            message: userErrorMessage.userNotFound
        };

        return await User.findByIdAndUpdate(userId, {
            $set: {
                age: age,
                branch: branch,
                user_type: userType,
                section: section,
                semester: semester,
                skills: skills,
                playerId: playerId
            }
        }, {new: true});
    } catch (e) {
        throw e;
    }
}

async function findUser(text) {
    try {
        return await User.find({"name": {$regex: text, $options: 'i'}})
    } catch (e) {
        throw e;
    }
}

module.exports.login = login;
module.exports.updateUser = updateUser;
module.exports.findUser = findUser;