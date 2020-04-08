const userType = {
    student: 1,
    faculty: 2,
    admin: 3
};

const modelChoicesJobState = {
    registered: 1,
    placed: 2,
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

const userErrorCodes = {
    noUserIdProvided: 421,
    userNotAuthorized: 435,
    userNotFound: 436
};

const userErrorMessage = {
    noUserIdProvided: 'Please Provide UserId',
    userNotAuthorized: 'User Not Authorized',
    userNotFound: 'User Not Found',
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

const placementErrorCodes = {
    noCompanyIdProvided: 411,
    noSkillsProvided: 412,
    noJobDescriptionProvided: 413,
    noPlaceProvided: 414,
    noJobTitleProvided: 415,
    noDateProvided: 416,
    noJobIdProvided: 422
};

const placementErrorMessage = {
    noCompanyIdProvided: 'Please Provide Company Id',
    noSkillsProvided: 'Please Provide Required Skills',
    noJobDescriptionProvided: 'Please Provide Job Description',
    noPlaceProvided: 'Please Provide Place Of Visit',
    noJobTitleProvided: 'Please Provide Job Title',
    noDateProvided: 'Please Provide Visit Date',
    noJobIdProvided: 'Please Provide Job Id'
};

const companyErrorCodes = {
    noCompanyNameProvided: 417,
    noCompanyWebsiteProvided: 417,
    noCompanyLogoProvided: 419,
    companyAlreadyAdded: 420
};

const companyErrorMessage = {
    noCompanyNameProvided: 'Please Provide Company Name',
    noCompanyWebsiteProvided: 'Please Provide Company Website',
    noCompanyLogoProvided: 'Please Provide Company Logo',
    companyAlreadyAdded: 'Company Already Exists'
};

const oneSignalConstants = {
    optionsForSubscribedUsers: {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic Yzg1ZGIxODItNWM5OS00MmYyLTgyZmMtMGM5NjhiYThlZTVi"
        }
    },

    appId: "3b283018-d182-4eef-a209-a31c824fe987"
};

module.exports.userType = Object.freeze(userType);
module.exports.loginErrorCodes = Object.freeze(loginErrorCodes);
module.exports.loginErrorMessage = Object.freeze(loginErrorMessage);
module.exports.genericErrorCodes = Object.freeze(genericErrorCodes);
module.exports.genericErrorMessage = Object.freeze(genericErrorMessage);
module.exports.homeErrorCodes = Object.freeze(homeErrorCodes);
module.exports.homeErrorMessages = Object.freeze(homeErrorMessages);
module.exports.placementErrorCodes = Object.freeze(placementErrorCodes);
module.exports.placementErrorMessage = Object.freeze(placementErrorMessage);
module.exports.companyErrorCodes = Object.freeze(companyErrorCodes);
module.exports.companyErrorMessage = Object.freeze(companyErrorMessage);
module.exports.modelChoicesJobState = Object.freeze(modelChoicesJobState);
module.exports.userErrorCodes = Object.freeze(userErrorCodes);
module.exports.userErrorMessage = Object.freeze(userErrorMessage);
module.exports.oneSignalConstants = Object.freeze(oneSignalConstants);
