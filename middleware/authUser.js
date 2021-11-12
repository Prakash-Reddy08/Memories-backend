module.exports = isUserAuthenticated = (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        next()
    }
    else {
        res.status(401).json({ message: "you must login first" })
    }
}