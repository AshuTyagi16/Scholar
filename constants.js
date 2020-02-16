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

const homeErrorCodes = {
    subjectNameNotFound: 408,
    subjectAddedAlready: 409,
    branchNameNotFound: 410,
    branchAddedAlready: 411,
    skillNameNotFound: 412,
    skillAddedAlready: 413
};

const homeErrorMessages = {
    subjectNameNotFound: 'Subject Name Not Found',
    subjectNameNotFoundMessage: 'Please Add Subject Name',
    subjectAddedAlready: 'Subject Exists Already',
    branchNameNotFound: 'Branch Name Not Found',
    branchNameNotFoundMessage: 'Please Add Branch Name',
    branchAddedAlready: 'Branch Exists Already',
    skillNameNotFound: 'Skill Name Not Found',
    skillNameNotFoundMessage: 'Please Add Skill Name',
    skillAddedAlready: 'Skill Already Exists'
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
module.exports.homeErrorCodes = Object.freeze(homeErrorCodes);
module.exports.homeErrorMessages = Object.freeze(homeErrorMessages);