const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: "Text must be filled out"
    },
    timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema)