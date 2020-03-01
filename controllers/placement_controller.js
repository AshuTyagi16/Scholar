const {Job} = require('../models/job');
const {Company} = require('../models/company');
const {Activity} = require('../models/activity');
const {
    placementErrorCodes, placementErrorMessage,
    genericErrorCodes, genericErrorMessage,
    companyErrorCodes, companyErrorMessage,
    userErrorCodes, userErrorMessage
} = require('../constants');
const {modelChoicesJobState} = require('../constants');
const mongoose = require('mongoose');

async function getUpcomingSchedule(userId) {
    try {
        if (!userId) throw {
            code: userErrorCodes.noUserIdProvided,
            name: userErrorMessage.noUserIdProvided,
            message: userErrorMessage.noUserIdProvided
        };
        userId = mongoose.Types.ObjectId(userId);
        const today = new Date();
        return await Job.aggregate([
            {
                $match: {
                    visit_date: {$gt: today}
                }
            },
            {
                $lookup: {
                    from: "activities",
                    let: {uid: userId, jid: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$$uid", "$user"]},
                                        {$eq: ["$$jid", "$job"]},
                                        {$eq: [modelChoicesJobState.registered, "$type"]}
                                    ]
                                },
                            }
                        },
                        {
                            $project: {
                                _id: 1
                            }
                        }
                    ],
                    as: "isRegistered"
                }
            },
            {
                $addFields: {
                    isRegistered: {
                        $cond: {if: {$gt: [{$size: "$isRegistered"}, 0]}, then: true, else: false}
                    }
                }
            },
            {
                $lookup: {
                    from: "companies",
                    let: {cid: "$company"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$$cid", "$_id"]},
                                    ]
                                },
                            }
                        },
                        {
                            $project: {
                                name: 1
                            }
                        }
                    ],
                    as: "company"
                }
            },
            {
                $unwind: "$company"
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "skill",
                    foreignField: "_id",
                    as: "skill"
                }
            }
        ]);
    } catch (e) {
        throw e;
    }
}

async function getPastSchedule(userId) {
    try {
        if (!userId) throw {
            code: userErrorCodes.noUserIdProvided,
            name: userErrorMessage.noUserIdProvided,
            message: userErrorMessage.noUserIdProvided
        };
        userId = mongoose.Types.ObjectId(userId);
        const today = new Date();
        return await Job.aggregate([
            {
                $match: {
                    visit_date: {$lt: today}
                }
            },
            {
                $lookup: {
                    from: "activities",
                    let: {uid: userId, jid: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$$uid", "$user"]},
                                        {$eq: ["$$jid", "$job"]},
                                        {$eq: [modelChoicesJobState.placed, "$type"]},
                                    ]
                                },
                            }
                        },
                        {
                            $project: {
                                _id: 1
                            }
                        }
                    ],
                    as: "isPlaced"
                }
            },
            {
                $addFields: {
                    isPlaced: {
                        $cond: {if: {$gt: [{$size: "$isPlaced"}, 0]}, then: true, else: false}
                    }
                }
            },
            {
                $lookup: {
                    from: "companies",
                    let: {cid: "$company"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$$cid", "$_id"]},
                                    ]
                                },
                            }
                        },
                        {
                            $project: {
                                name: 1
                            }
                        }
                    ],
                    as: "company"
                }
            },
            {
                $unwind: "$company"
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "skill",
                    foreignField: "_id",
                    as: "skill"
                }
            }
        ]);
    } catch (e) {
        throw e;
    }
}

async function getLiveSchedule(userId) {
    try {
        if (!userId) throw {
            code: userErrorCodes.noUserIdProvided,
            name: userErrorMessage.noUserIdProvided,
            message: userErrorMessage.noUserIdProvided
        };
        userId = mongoose.Types.ObjectId(userId);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        return await Job.aggregate([
            {
                $match: {
                    $and: [
                        {visit_date: {$gte: today}},
                        {visit_date: {$lt: tomorrow}}
                    ]
                }
            },
            {
                $lookup: {
                    from: "activities",
                    let: {uid: userId, jid: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$$uid", "$user"]},
                                        {$eq: ["$$jid", "$job"]},
                                        {$eq: [modelChoicesJobState.registered, "$type"]}
                                    ]
                                },
                            }
                        },
                        {
                            $project: {
                                _id: 1
                            }
                        }
                    ],
                    as: "isRegistered"
                }
            },
            {
                $addFields: {
                    isRegistered: {
                        $cond: {if: {$gt: [{$size: "$isRegistered"}, 0]}, then: true, else: false}
                    }
                }
            },
            {
                $lookup: {
                    from: "companies",
                    let: {cid: "$company"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$$cid", "$_id"]},
                                    ]
                                },
                            }
                        },
                        {
                            $project: {
                                name: 1
                            }
                        }
                    ],
                    as: "company"
                }
            },
            {
                $unwind: "$company"
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "skill",
                    foreignField: "_id",
                    as: "skill"
                }
            }
        ]);
    } catch (e) {
        throw e;
    }
}

async function getAllCompanies() {
    try {
        return await Company.find();
    } catch (e) {
        throw e;
    }
}

async function addJob(companyId, skills, title, description, place, visitData) {
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
        if (!visitData) throw {
            code: placementErrorCodes.noDateProvided,
            name: placementErrorMessage.noDateProvided,
            message: placementErrorMessage.noDateProvided
        };
        let job = new Job({
            company: companyId,
            skill: skills,
            title: title,
            description: description,
            place: place,
            visit_date: visitData
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

async function applyJob(user, job) {
    try {
        if (!user) throw {
            code: userErrorCodes.noUserIdProvided,
            name: userErrorMessage.noUserIdProvided,
            message: userErrorMessage.noUserIdProvided
        };
        if (!job) throw {
            code: placementErrorCodes.noJobIdProvided,
            name: placementErrorMessage.noJobIdProvided,
            message: placementErrorMessage.noJobIdProvided
        };
        let activity = new Activity({
            user: user,
            job: job
        });

        activity = await activity.save();
        if (!activity) throw {
            code: genericErrorCodes,
            name: genericErrorMessage.someErrorOccurred,
            message: genericErrorMessage.someErrorOccurred,
        };
        return activity;
    } catch (e) {
        throw e;
    }
}

module.exports.getUpcomingSchedule = getUpcomingSchedule;
module.exports.getPastSchedule = getPastSchedule;
module.exports.getLiveSchedule = getLiveSchedule;
module.exports.getAllCompanies = getAllCompanies;
module.exports.addJob = addJob;
module.exports.addCompany = addCompany;
module.exports.applyJob = applyJob;