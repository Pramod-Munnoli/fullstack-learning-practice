// // import express from "express"; 
// // import cors from "cors";
// // import data from "./views/data.json"  with { type: "json" };
// // const app = express(); 
// // const port = 8080;
// // app.use(cors());
// // app.set("view engine","ejs");

// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
 

// // import path from "path";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // app.get("/register", (req, res) => {
// //   res.sendFile(path.join(__dirname, "index.html"));
// // });

// // app.post("/register", (req, res) => {
// //   const { username, password } = req.body;
  
// //   if (!username || !password) {
// //     return res.status(400).send("Username and password are required!");
// //   }

// //   console.log("-------------------------------");
// //   console.log("SUCCESS: POST request caught!");
// //   console.log("Username received:", username);
// //   console.log("Password received:", password);
// //   console.log("-------------------------------");

// //   res.send(`
// //     <h1>Success!</h1>
// //     <p>User <strong>${username}</strong> was successfully registered on the server.</p>
// //     <a href="/register">Go back</a>
// //   `);
// // });

// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // }); 


// //  app.get("/",(req,res)=>{
// //     res.render("index.ejs");
// //   })

// //   app.get("/rolldice",(req,res)=>{
// //     let rolldice = Math.floor(Math.random()*6)+1;
// //     res.render("rolldice.ejs",{rolldice});
// //   })

// //   app.get("/ig/:username", (req, res) => {
// //     let { username } = req.params;
// //     const instadata = data[username];
// //     if (instadata) {
// //       res.render("instagram.ejs", { instadata });
// //     } else {
// //       res.send("<h1>No such account found!</h1>");
// //     }
// //   });  

 

// // app.get("/fruits", (req, res) => {
// //   res.json(Frute);
// // });


// // app.get("/:username/:id",(req,res)=>{
// //   console.log("request received");
// //   res.send(`<h1>welcome to ${req.params.username}</h1>
// //     <h2>your id is ${req.params.id}</h2>`);
// // })

// // app.get("/search",(req,res)=>{
// //   console.log(req.query);
// //   if(!req.query.q){
// //     res.send("Please provide a search query");
// //     return;
// //   }
// //   res.send(`<h1>search results for ${req.query.q}</h1>`);
// // })








// // Quora Post System
// // const express = require("express");
// // const path = require("path");
// // const { v4: uuidv4 } = require('uuid');
// // const methodOverride = require("method-override");

// // const app = express();
// // const port = 3000;

// // app.use(express.urlencoded({ extended: true }));
// // app.use(methodOverride("_method"));
// // app.use(express.json());
// // app.use(express.static(path.join(__dirname, "public")));

// // app.set("view engine", "ejs");
// // app.set("views", path.join(__dirname, "views"));

// // let posts=[
// //   { 
// //     id:uuidv4(),
// //     username:"apnaclg",
// //     content:"I love coding"
// //   },
// //   {
// //     id:uuidv4(),
// //     username:"pramod",
// //     content:"I love enjoying my self"
// //   },
// //   {
// //     id:uuidv4(),
// //     username:"mallu",
// //     content:"I love editing"
// //   }
  
// // ];

// // app.get("/posts", (req, res) => {
// //   res.render("index.ejs",{posts});
// // });

// // app.get("/posts/new", (req, res) => {
// //   res.render("new.ejs",{posts});
// // });

// // app.post("/posts",(req,res)=>{
// //   let {username ,content}=req.body;
// //   let id = uuidv4(); 
// //   posts.push({id, username, content});
// //   res.redirect("/posts");
// // })

// // app.get("/posts/:id",(req,res)=>{
// //   let {id} = req.params;
// //   let post = posts.find((p)=> id === p.id);
// //   if (post) {
// //     res.render("indpost.ejs",{post});
// //   } else {
// //     res.status(404).send("Post not found!");
// //   }
// // })

// // app.get("/posts/:id/edit",(req,res)=>{
// //   let {id} = req.params;
// //   let post = posts.find((p)=> id === p.id);
// //   if (post) {
// //     res.render("edit.ejs",{post});
// //   } else {
// //     res.status(404).send("Post not found");
// //   }
// // })

// // app.patch("/posts/:id",(req,res)=>{
// //   let {id} = req.params;
// //   let newContent = req.body.content; 
// //   let post = posts.find((p) => id === p.id);
// //   if (post) {
// //       post.content = newContent;
// //       res.redirect("/posts");
// //   } else {
// //       res.status(404).send("Post not found");
// //   }
// // })

// // app.delete("/posts/:id",(req,res)=>{
// // let {id}=req.params;
// //  if (posts) { 
// //       posts = posts.filter((p) => id !== p.id);
// //       res.redirect("/posts");
// //   } else {
// //       res.status(404).send("Post not found");
// //   }
// // })

// // app.listen(port, () => {
// //   console.log(`listening to port :${port}`);
// // });


// // using faker js 

const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const path = require("path");  
  const app = express(); 
  const port = 8080;
  
  app.set("view engine","ejs");
  
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pramod@8123',
  database: 'delta'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL Server successfully!');

  let getRandomUser = () => {
    return [
      faker.internet.username(),
      faker.internet.email(),
      faker.internet.password()
    ];
  };

  app.get("/", (req, res) => { 
    let q = "select count(*) from users";
    try{
    connection.query(q,(err,results)=>{
      if(err) throw err;
        console.log(results);
        res.render("routes_acc/home.ejs",{results});
      })
    }catch(err){
      console.log(err);
      res.send("error");
    }
  });

  app.listen("8080",()=>{
    console.log(`server is running on port http://localhost:${port}`);
  });

  // let data = [];
  // for (let i = 0; i < 10; i++) {
  //   data.push(getRandomUser());
  // }

  // Bulk insert syntax: INSERT INTO table (cols) VALUES ?
  // The data must be an array of arrays, wrapped in another array: [ [ [r1c1, r1c2], [r2c1, r2c2] ] ]
  // const q = "INSERT INTO users (username, email, password) VALUES ?";
  
  // connection.query(q, [data], (error, results) => {
  //   if (error) {
  //     console.error("❌ Error inserting data:", error.message);
  //   } else {
  //     console.log("✔️ 10 users inserted successfully!");
  //     console.log("Number of affected rows:", results.affectedRows);
  //   }
  //   connection.end();
  // });
});








// & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
