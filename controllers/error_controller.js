function sendError(errorCode, name, message) {
    return {
        error: {
            errorCode: errorCode,
            name: name,
            message: message
        }
    }
}

module.exports.sendError = sendError;