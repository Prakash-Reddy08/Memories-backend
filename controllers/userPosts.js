const posts = require('../database/model/postsModal');
const fs = require('fs')
const getPosts = async (req, res) => {
    try {
        const allPosts = await posts.find({});
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json(error);
    }
}

const createPost = async (req, res) => {
    const { creator, title, message, tags, creatorID, desc, creatorName, image } = req.body;
    let newTag = tags.toString().split(',').slice(0, 3);
    const time = Date.now();
    console.log(time);
    try {
        const newPost = await new posts({ creator, title, message, time, tags: newTag, image, creatorID, desc, creatorName });
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getSinglePost = async (req, res) => {
    const id = req.params.id;
    try {
        const foundPost = await posts.findById({ _id: id });
        res.status(200).json(foundPost);
    } catch (error) {
        res.status(400).json('cannot find the post')
    }
}

const findByCreator = async (req, res) => {
    const creatorID = req.params.creatorID;
    try {
        const foundPost = await posts.find({ creatorID });
        res.status(200).json(foundPost);
    } catch (error) {
        res.status(400).json('cannot find the post')
    }
}

const updateLikes = async (req, res) => {
    const postId = req.params.id;
    const likes = req.body;
    console.log(likes);
    try {
        const updateLikes = await posts.findByIdAndUpdate(postId, { likeCount: likes }, { new: true });
        res.status(200).json(updateLikes);
    } catch (error) {
        res.status(400).json('error')
    }
}


const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await posts.findByIdAndDelete({ _id: id });
        if (!post) {
            return res.status(400).json({ message: "no post found" })
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = { updateLikes, getPosts, createPost, findByCreator, getSinglePost, deletePost }