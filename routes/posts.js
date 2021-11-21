const router = require('express').Router();
const { getPosts, createPost, findByCreator, deletePost, getSinglePost } = require('../controllers/userPosts');
const upload = require('../middleware/uploads');

router.get('/posts', getPosts);

router.get('/getsinglepost/:id', getSinglePost);

router.get('/getuserposts/:creator', findByCreator);

router.post('/create', createPost);


router.delete('/delete/:id', deletePost);

module.exports = router;