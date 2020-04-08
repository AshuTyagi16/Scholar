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
        const users = User.find({_id: {$in: members}}, {playerId: 1, _id: 0});
        const playerIds = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].playerId != null)
                playerIds.push(users[i].playerId);
        }
        await sendNotificationAll(title, "You have been assigned a new project", playerIds);
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
        let arr = [];
        for (let i = 0; i < user.length; i++) {
            if (user[i].playerId != null)
                arr.push(user[i].playerId);
        }
        await sendNotificationAll(title, description, arr);
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