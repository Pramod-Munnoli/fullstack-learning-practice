const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

module.exports.signup = wrapAsync(async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({ success: true, user: registeredUser, message: "Welcome to Wanderlust!" });
        });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
});

module.exports.login = wrapAsync(async (req, res) => {
    res.json({ success: true, user: req.user, message: "Welcome back! Logged in successfully." });
});

module.exports.logout = wrapAsync(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, message: "Logged you out!" });
    });
});