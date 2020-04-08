const {Project} = require('../models/project');
const {User} = require('../models/user');
const {sendNotificationAll} = require('./notification_controller');

async function assignProject(members, faculty, deadline, title, description) {
    try {
        let project = new Project({
            members: members,
            faculty: faculty,
            deadline: deadline,
            title: title,
            description: description
        });
        project = await project.save();
        return project;
    } catch (e) {
        throw e;
    }
}

async function updateProgress(project, progress) {
    try {
        return await Project
            .findByIdAndUpdate(project, {
                $set: {progress: progress,}
            }, {new: true});
    } catch (e) {
        throw e;
    }
}

async function getMyProject(user) {
    try {
        return await Project.find({members: {$elemMatch: {$eq: user}}}).populate('members').populate('faculty')
    } catch (e) {
        throw e;
    }
}

async function getProjectUnderFaculty(faculty) {
    try {
        return await Project.find({faculty: faculty}).populate('members').populate('faculty')
    } catch (e) {
        throw e;
    }
}

async function getAllProjects() {
    try {
        return await Project.find().populate('members').populate('faculty')
    } catch (e) {
        throw e;
    }
}

async function sendMessageToAll(title, description) {
    try {
        const user = await User.find({}, {playerId: 1, _id: 0});
        console.log(JSON.stringify(user));
        let arr = [];
        for (let i = 0; i < user.length; i++) {
            arr.push(user.playerId);
        }
        console.log(JSON.stringify(arr));
        // await sendNotificationAll(title, description,);
        return true;
    } catch (e) {
        throw e;
    }
}

module.exports.assignProject = assignProject;
module.exports.getMyProject = getMyProject;
module.exports.updateProgress = updateProgress;
module.exports.getProjectUnderFaculty = getProjectUnderFaculty;
module.exports.getAllProjects = getAllProjects;
module.exports.sendMessageToAll = sendMessageToAll;