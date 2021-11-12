const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    fullName: String,
    googleId: String,
    avatar: String
})

module.exports = mongoose.model('User', userSchema);