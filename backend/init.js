const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
  console.log(" ✅ connection successfull");

  let allchat = [
    {
      from: "Pramod",
      to: "Anushka",
      msg: "Hello Anushka",
      created_at: new Date(),
    },
    {
      from: "Anushka",
      to: "Pramod",
      msg: "Hello Pramod",
      created_at: new Date(),
    },
    {
      from: "Tonny",
      to: "Peter",
      msg: "How was your day?",
      created_at: new Date(),
    },
    {
      from: "Peter",
      to: "Tonny",
      msg: "It was great",
      created_at: new Date(),
    },
    {
      from: "Tony",
      to: "Steve",
      msg: "We need to talk",
      created_at: new Date(),
    },
  ];

  await Chat.insertMany(allchat);
  console.log(" ✅ Initial data inserted successful");
  process.exit();
}

main().catch((err) => {
  console.log(" ❌ error initializing database", err);
  process.exit(1);
});

