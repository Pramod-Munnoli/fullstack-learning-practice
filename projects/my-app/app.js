const express = require("express");
const app = express();
const mongoose = require("mongoose"); 
const Listing = require("./models/listing");
 
const path  = require("path");
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
main().then(()=>{
console.log("connection success full");
}).catch((err)=>{
console.log(err);
})

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/listings/:id", async (req,res)=>{
  let {id} = req.params;
  const list = await Listing.findById(id);
  res.render("./listings/edit.ejs",{list})
})

app.post("/listings/new", async (req,res)=>{
  let  newListing = new Listing(req.body.listing);
  await newListing.save(); 
  res.redirect("/listings");
}); 

app.get("/listings/new",(req,res)=>{
  res.render("./listings/new.ejs");
})

app.get("/listings/:id", async (req,res)=>{
  let {id} = req.params;
  const list = await Listing.findById(id);
  res.render("./listings/show.ejs",{list})
})
 
app.get("/listings", async (req,res)=>{
   let allListings = await Listing.find({});
   res.render("./listings/index.ejs",{allListings});
})

// app.get("/testListing", async (reqq,res)=>{
//   let sampleListing = new Listing({
//     title:"appartment",
//     description:"Buy The world best appartmet",
//     image:"",
//     price:200000,
//     location:"Belagavi",
//     country:"India",
//   })

//   await sampleListing.save().then(()=>{
//     console.log("Saved successully");
//   }).catch((err)=>{
//     console.log(err);
//   })
//   res.send("successfull testing");
// })
app.get("/", (req, res) => {
  res.send("root rout is workig ");
});

app.listen(8080, () => {
  console.log("server is workig on http://localhost:8080/");
});