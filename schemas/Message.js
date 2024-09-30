const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: String,
    timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema)