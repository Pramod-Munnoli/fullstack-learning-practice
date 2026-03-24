const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "mysupersecretstring",
     resave:false , 
     resave:false ,
     saveUninitialized:true
    }

app.use(session(sessionOptions));
app.use(flash());

app.get("/", (req, res) => {
    res.send("Welcome to your Mongoose Practice Server! Try /hello or /register");
});

app.get("/register",(req,res)=>{
    let {name = "anonymuse"} = req.query;
    req.session.name= name;
    req.flash("success", "user registerd succesfull");

    res.redirect("/hello");
})
 
app.get("/hello",(req,res)=>{
    res.locals.msg = req.flash("success");
    
    res.render("page.ejs", {name: req.session.name});
});

// app.get("/test", (req, res) => {  
//     if(req.session.count){
//         req.session.count++;
//     } else{
//         req.session.count = 1;
//     }
//   res.send(`you sent request to ${req.session.count} times`);
// });
 

app.listen(3000, () => {
  console.log("server is workig on http://localhost:3000/");
});   