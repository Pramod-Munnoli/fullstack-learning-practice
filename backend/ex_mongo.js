const mongoose = require("mongoose");
main()
  .then(() => {
    console.log(" ✅ connection successfull");
  })
  .catch((err) => {
    console.log(" ❌ connection failed", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: {
    type: Number,
    required: true,
    maxLength: 3,
    minLength: 1,
    min: [18, "age must be greater than 18"],
    max: [100, "age must be less than 100"],
  },
});

const User = mongoose.model("User", userSchema);
User.findByIdAndUpdate(
  "69ba419ff7f0993ff902a3a8",
  { age: 101 },
  { runValidators: true },
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

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
