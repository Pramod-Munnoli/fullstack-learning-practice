const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const userController = require("../controller/user.js");

router.post("/signup", userController.signup);

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ success: false, message: info.message || "Login failed" });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return userController.login(req, res);
        });
    })(req, res, next);
});

router.get("/logout", userController.logout);

module.exports = router;

