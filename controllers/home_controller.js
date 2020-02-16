const {Branch} = require('../models/branch');
const {Subject} = require('../models/subject');
const {Skill} = require('../models/skill');
const {homeErrorCodes, homeErrorMessages, genericErrorCodes, genericErrorMessage} = require('../constants');

async function getAllBranches() {
    try {
        return await Branch.find()
    } catch (e) {
        throw e;
    }
}

async function getAllSubjects() {
    try {
        return await Subject.find()
    } catch (e) {
        throw e;
    }
}

async function getAllSkills() {
    try {
        return await Skill.find()
    } catch (e) {
        throw e;
    }
}

async function addSubject(subjectName) {
    try {
        if (!subjectName) throw {
            code: homeErrorCodes.subjectNameNotFound,
            name: homeErrorMessages.subjectNameNotFound,
            message: homeErrorMessages.subjectNameNotFoundMessage
        };

        let subject = await Subject.findOne({name: subjectName});
        console.log("SUB  : " + subject);
        if (subject) throw {
            code: homeErrorCodes.subjectAddedAlready,
            name: homeErrorMessages.subjectAddedAlready,
            message: homeErrorMessages.subjectAddedAlready
        };

        subject = new Subject({name: subjectName});
        subject = await subject.save();
        if (!subject) throw {
            code: genericErrorCodes,
            name: genericErrorMessage.someErrorOccurred,
            message: genericErrorMessage.someErrorOccurred,
        };
        return subject;
    } catch (e) {
        throw e;
    }
}

async function addSkill(skillName) {
    try {
        if (!skillName) throw {
            code: homeErrorCodes.skillNameNotFound,
            name: homeErrorMessages.skillNameNotFound,
            message: homeErrorMessages.skillNameNotFoundMessage
        };
        let skill = await Skill.findOne({name: skillName});
        if (skill) throw {
            code: homeErrorCodes.skillAddedAlready,
            name: homeErrorMessages.skillAddedAlready,
            message: homeErrorMessages.skillAddedAlready
        };
        skill = new Skill({name: skillName});
        skill = await skill.save();
        if (!skill) throw {
            code: genericErrorCodes,
            name: genericErrorMessage.someErrorOccurred,
            message: genericErrorMessage.someErrorOccurred,
        };
        return skill;
    } catch (e) {
        throw e;
    }
}

module.exports.getAllBranches = getAllBranches;
module.exports.getAllSubjects = getAllSubjects;
module.exports.getAllSkills = getAllSkills;
module.exports.addSubject = addSubject;
module.exports.addSkill = addSkill;