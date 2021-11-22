const router = require('express').Router();
const { getPosts, createPost, findByCreator, updateLikes, deletePost, getSinglePost } = require('../controllers/userPosts');

router.get('/posts', getPosts);

router.get('/getsinglepost/:id', getSinglePost);

router.get('/getuserposts/:creator', findByCreator);

router.post('/create', createPost);

router.post('/like/:id', updateLikes);


router.delete('/delete/:id', deletePost);

module.exports = router;