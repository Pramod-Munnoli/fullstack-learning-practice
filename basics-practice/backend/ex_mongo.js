const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const Chat = require("./models/chat.js");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main()
  .then(() => {
    console.log(" ✅ connection successfull");
  })
  .catch((err) => {
    console.log(" ❌ connection failed", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


app.get("/", (req, res) => {
  res.send("root route");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find(); 
  res.render("whatspp_routs/index.ejs", { chats });
});

app.get("/chats/new", (req , res)=>{
  res.render("whatspp_routs/new_chat.ejs");
})

app.post("/chats",(req,res)=>{
  let {from , to , msg}= req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  })
  newChat.save()
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log(err);
  })
  res.redirect("/chats");
})

app.delete("/chats/:id/delete",(req,res)=>{
  let {id} = req.params;
  Chat.findByIdAndDelete(id)
  .then((res)=>{
    console.log(" ✅ delete successfull",res);
  })
  .catch((err)=>{
    console.log(" ❌ delete failed",err);
  })
  res.redirect("/chats");
})

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  if (!chat) {
    console.log(" ❌ edit failed: Chat not found");
    return res.redirect("/chats");
  }
  res.render("whatspp_routs/edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  
  await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg, created_at: new Date() },
    { runValidators: true, returnDocument: "after" }
  )
  .then((updatedChat) => {
    console.log(" ✅ edit successfull", updatedChat);
  })
  .catch((err) => {
    console.log(" ❌ edit failed", err);
  });
  
  res.redirect("/chats");
});


app.listen("8080", (req, res) => {
  console.log("server is running on port http://localhost:8080");
});

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: {
//     type: Number,
//     required: true,
//     maxLength: 3,
//     minLength: 1,
//     min: [18, "age must be greater than 18"],
//     max: [100, "age must be less than 100"],
//   },
// });

// const User = mongoose.model("User", userSchema);
// User.findByIdAndUpdate(
//   "69ba419ff7f0993ff902a3a8",
//   { age: 101 },
//   { runValidators: true },
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.deleteMany({ age: { $gte: 34 } })
//   .then((res) => {
//     console.log(" ✅ delete successfull", res);
//   })
//   .catch((err) => {
//     console.log(" ❌ delete failed", err);
//   });

// User.updateMany({ age: { $gte: 33 } }, { age: 34 })
//   .then((res) => {
//     console.log(" ✅ update successfull", res);
//   })
//   .catch((err) => {
//     console.log(" ❌ update failed", err);
//   });

// User.updateOne({ name: "teacher" }, { age: 33 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.find({ age: { $gte: 34 } })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.insertOne({
//   name: "anushka",
//   email: "anushka@mail.com",
//   age: 100,
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.insertMany([
//   { name: "Tony", email: "tonny@gmail.com", age: 50 },
//   { name: "Adi", email: "Adi@gmail.com", age: 50 },
//   { name: "Viswas", email: "Viswas@gmail.com", age: 50 },
// ])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const user2 = new User({
//   name: "teacher",
//   email: "teacher@gmail.com",
//   age: 22,
// });

// user2
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
