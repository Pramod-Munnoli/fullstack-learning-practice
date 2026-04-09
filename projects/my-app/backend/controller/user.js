const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken"); 

module.exports.signup = wrapAsync(async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            
        const token = jwt.sign(
        {id: req.user._id, username: req.user.username},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
        );

        res.json({
        success:true,
        token,
        user: req.user,
        message:"Logged in successfully!"
       });
    
        });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
});

module.exports.login = wrapAsync(async (req, res) => {
    const token = jwt.sign(
        {id: req.user._id, username: req.user.username},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
    res.json({
        success:true,
        token,
        user: req.user,
        message:"Logged in successfully!"
    });
    
});

module.exports.logout = wrapAsync(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, message: "Logged you out!" });
    });
});
