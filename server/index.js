import express from "express";
import Frute from "./fruts/index.js";

const app = express(); 
const port = 3000;
app.set("view engine","ejs");

 app.get("/",(req,res)=>{
    res.render("index.ejs");
  })

  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});  

// app.get("/fruits", (req, res) => {
//   res.json(Frute);
// });


// app.get("/:username/:id",(req,res)=>{
//   console.log("request received");
//   res.send(`<h1>welcome to ${req.params.username}</h1>
//     <h2>your id is ${req.params.id}</h2>`);
// })

// app.get("/search",(req,res)=>{
//   console.log(req.query);
//   if(!req.query.q){
//     res.send("Please provide a search query");
//     return;
//   }
//   res.send(`<h1>search results for ${req.query.q}</h1>`);
// })

 