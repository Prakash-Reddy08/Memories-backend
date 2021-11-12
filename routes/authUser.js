const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureMessage: "Cannot login to Google, please try again later!",
        failureRedirect: "http://localhost:3000/login/error",
        successRedirect: "http://localhost:3000/login/success",
    }),
    (req, res) => {
        console.log("User: ", req.user);
        res.send("Thank you for signing in!");
    }
);

module.exports = router;