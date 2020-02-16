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

const placementErrorCodes = {
    noCompanyIdProvided: 411,
    noSkillsProvided: 412,
    noJobDescriptionProvided: 413,
    noPlaceProvided: 414,
    noJobTitleProvided: 415
};

const placementErrorMessage = {
    noCompanyIdProvided: 'Please Provide Company Id',
    noSkillsProvided: 'Please Provide Required Skills',
    noJobDescriptionProvided: 'Please Provide Job Description',
    noPlaceProvided: 'Please Provide Place Of Visit',
    noJobTitleProvided: 'Please Provide Job Title'
};

const companyErrorCodes = {
    noCompanyNameProvided: 416,
    noCompanyWebsiteProvided: 417,
    noCompanyLogoProvided: 418,
    companyAlreadyAdded: 419
};

const companyErrorMessage = {
    noCompanyNameProvided: 'Please Provide Company Name',
    noCompanyWebsiteProvided: 'Please Provide Company Website',
    noCompanyLogoProvided: 'Please Provide Company Logo',
    companyAlreadyAdded: 'Company Already Exists'
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
