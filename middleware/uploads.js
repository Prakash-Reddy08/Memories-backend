const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        req.invalidFile = 'invalid file format'
        cb(null, false, req.invalidFile)
    }
}

const upload = multer({
    storage, limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter
}).single('image');

module.exports = upload;