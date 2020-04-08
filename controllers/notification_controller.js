const https = require('https');
const {oneSignalConstants} = require('../constants');

async function sendNotificationAll(title, description, playerIds) {
    const notification = createNotificationMessage(title, description, playerIds);
    oneSignalNotification(notification)
}

function createNotificationMessage(headingsContent, messageContent, playerIds) {

    let message = {
        app_id: oneSignalConstants.appId,
        contents: {"en": messageContent},
        include_player_ids: playerIds
    };

    if (headingsContent) {
        message["headings"] = {"en": headingsContent};
    }

    return message;
}


function oneSignalNotification(message) {
    const req = https.request(oneSignalConstants.optionsForSubscribedUsers, function (res) {
        res.on('data', function (data) {
            try {
                console.log("Response:");
                console.log(JSON.stringify(data));
            } catch (err) {
                console.log(err);
            }
        });
    });

    req.on('error', function (e) {
        console.log(e);
        throw new Error(e.message);
    });

    req.write(JSON.stringify(message));
    req.end();
}

module.exports.sendNotificationAll = sendNotificationAll;