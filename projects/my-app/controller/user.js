const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync"); 

module.exports.renderSignupForm = wrapAsync(async (req, res) => {
    res.render("users/signup");
})

module.exports.signup =wrapAsync(async (req, res) => {
    try{
        let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings")
    });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
  })

module.exports.renderLoginForm = wrapAsync(async (req, res) => {
    res.render("users/login");
  })


module.exports.login = wrapAsync(async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  })

  module.exports.logout = wrapAsync(async (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listings");
    });
  });