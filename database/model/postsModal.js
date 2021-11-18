const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    creatorName: String,
    creatorID: String,
    tags: [String],
    image: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Post', postSchema);