const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        unique: true
    },
    role: String,
    password: String,
    createdAt: Date
});

module.exports = User;