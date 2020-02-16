const {Job} = require('../models/job');
const {Company} = require('../models/company');
const {
    placementErrorCodes, placementErrorMessage,
    genericErrorCodes, genericErrorMessage,
    companyErrorCodes, companyErrorMessage
} = require('../constants');

async function getUpcomingCompanies(userId) {

}

async function getPassCompanies(userId) {

}

async function getLiveCompanies(userId) {

}

async function addJob(companyId, skills, title, description, place) {
    try {
        if (!companyId) throw {
            code: placementErrorCodes.noCompanyIdProvided,
            name: placementErrorMessage.noCompanyIdProvided,
            message: placementErrorMessage.noCompanyIdProvided
        };
        if (!skills) throw {
            code: placementErrorCodes.noSkillsProvided,
            name: placementErrorMessage.noSkillsProvided,
            message: placementErrorMessage.noSkillsProvided
        };
        if (!description) throw {
            code: placementErrorCodes.noJobDescriptionProvided,
            name: placementErrorMessage.noJobDescriptionProvided,
            message: placementErrorMessage.noJobDescriptionProvided
        };
        if (!place) throw {
            code: placementErrorCodes.noPlaceProvided,
            name: placementErrorMessage.noPlaceProvided,
            message: placementErrorMessage.noPlaceProvided
        };
        if (!title) throw {
            code: placementErrorCodes.noJobTitleProvided,
            name: placementErrorMessage.noJobTitleProvided,
            message: placementErrorMessage.noJobTitleProvided
        };
        let job = new Job({
            company: companyId,
            skill: skills,
            title: title,
            description: description,
            place: place
        });

        job = await job.save();

        if (!job) throw {
            code: genericErrorCodes.someErrorOccurred,
            name: genericErrorMessage.someErrorOccurred,
            message: genericErrorMessage.someErrorOccurred
        };
        return job;
    } catch (e) {
        throw e;
    }
}

async function addCompany(name, website, logo) {
    try {
        if (!name) throw {
            code: companyErrorCodes.noCompanyNameProvided,
            name: companyErrorMessage.noCompanyNameProvided,
            message: companyErrorMessage.noCompanyNameProvided
        };
        if (!website) throw {
            code: companyErrorCodes.noCompanyWebsiteProvided,
            name: companyErrorMessage.noCompanyWebsiteProvided,
            message: companyErrorMessage.noCompanyWebsiteProvided
        };
        if (!logo) throw {
            code: companyErrorCodes.noCompanyLogoProvided,
            name: companyErrorMessage.noCompanyLogoProvided,
            message: companyErrorMessage.noCompanyLogoProvided
        };

        let company = await Company.findOne({name: name});

        if (company) throw {
            code: companyErrorCodes.companyAlreadyAdded,
            name: companyErrorMessage.companyAlreadyAdded,
            message: companyErrorMessage.companyAlreadyAdded
        };

        company = new Company({
            name: name,
            website: website,
            logo: logo,
        });

        company = await company.save();

        if (!company) throw {
            code: genericErrorCodes.someErrorOccurred,
            name: genericErrorMessage.someErrorOccurred,
            message: genericErrorMessage.someErrorOccurred
        };
        return company;
    } catch (e) {
        throw e;
    }
}

module.exports.getUpcomingCompanies = getUpcomingCompanies;
module.exports.getPassCompanies = getPassCompanies;
module.exports.getLiveCompanies = getLiveCompanies;
module.exports.addJob = addJob;
module.exports.addCompany = addCompany;