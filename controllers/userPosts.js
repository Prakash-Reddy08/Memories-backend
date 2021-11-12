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
    const { creator, title, message, tags } = req.body;
    let newTag = tags.toString().split(',');
    const image = req?.file?.path;
    if (req.invalidFile) {
        res.status(400).json('image must be jpeg or png')
    }
    try {
        const newPost = await new posts({ creator, title, message, tags: newTag, image });
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
    const creator = req.params.creator;
    try {
        const foundPost = await posts.find({ creator });
        res.status(200).json(foundPost);
    } catch (error) {
        res.status(400).json('cannot find the post')
    }
}


const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await posts.findByIdAndDelete({ _id: id });
        if (post?.image) {
            fs.unlinkSync("./" + post.image);
        }
        if (!post) {
            return res.status(400).json({ message: "no post found" })
        }
        res.status(200).json("Post deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = { getPosts, createPost, findByCreator, getSinglePost, deletePost }