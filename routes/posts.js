const router = require('express').Router();
const { getPosts, createPost, findByCreator, deletePost, getSinglePost } = require('../controllers/userPosts');
const upload = require('../middleware/uploads');
const multer = require('multer');

router.get('/', getPosts);

router.get('/getsinglepost/:id', getSinglePost);

router.get('/getuserposts/:creator', findByCreator);

router.post('/create', (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json(err.message + "length must be less than 2mb")
        } else if (err) {
            return res.send(err)
        }
        else {
            next();
        }
    })
}, createPost);


router.delete('/delete/:id', deletePost);

module.exports = router;