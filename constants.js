const userType = {
    student: 1,
    faculty: 2,
    admin: 3
};

const loginErrorCodes = {
    noSuchEmailFound: 405,
    emailNotProvided: 406,
    nameNotProvided: 407
};

const loginErrorMessage = {
    noSuchEmailFound: 'Email Not Found',
    emailNotProvided: 'Email Not Provided',
    nameNotProvided: 'Name Not Provided'
};

const genericErrorCodes = {
    success: 200,
    someErrorOccurred: 501
};

const genericErrorMessage = {
    someErrorOccurred: 'Some Error Occurred'
};

module.exports.userType = Object.freeze(userType);
module.exports.loginErrorCodes = Object.freeze(loginErrorCodes);
module.exports.loginErrorMessage = Object.freeze(loginErrorMessage);
module.exports.genericErrorCodes = Object.freeze(genericErrorCodes);
module.exports.genericErrorMessage = Object.freeze(genericErrorMessage);