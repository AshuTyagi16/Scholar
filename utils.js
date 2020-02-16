function objectIdWithTimestamp(timestamp) {
    if (typeof (timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }

    // Convert date object to hex seconds since Unix epoch
    const hexSeconds = Math.floor(timestamp / 1000).toString(16);

    // Create an ObjectId with that hex timestamp
    return ObjectId(hexSeconds + "0000000000000000")
}

module.exports.objectIdWithTimestamp = objectIdWithTimestamp;