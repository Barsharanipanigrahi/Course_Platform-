const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false
    },
    replied: {
        type: Boolean,
        default: false
    },
    repliedAt: {
        type: Date,
    }
},
    { timestamps: true },
);

module.exports = mongoose.model('Contact', contactSchema);