const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});

const User = mongoose.model('user', user, 'users');

module.exports = User;