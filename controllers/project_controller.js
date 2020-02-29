const {Project} = require('../models/project');

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
        return await Project.aggregate(
            [
                {
                    $match: {
                        members: {$in: user}
                    }
                }
            ]
        );
    } catch (e) {
        throw e;
    }
}

module.exports.assignProject = assignProject;
module.exports.getMyProject = getMyProject;
module.exports.updateProgress = updateProgress;