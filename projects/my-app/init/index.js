const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// 1. ADD THIS to load your Atlas URL from the .env file
require("dotenv").config(); 

const DB_URL = process.env.ATLASDB_URL; 

main()
  .then(() => {
    console.log("Connected to Atlas successfully!");
    initDB(); // 2. Call your data initialization ONLY after connection is successful
  })
  .catch((err) => {
    console.log("Error connecting to Atlas:", err);
  });

async function main() {
  console.log("Connecting to:", DB_URL);
  await mongoose.connect(DB_URL); // 3. Use DB_URL here
}

const initDB = async () => {
  await Listing.deleteMany({});
  
  const tempUsers = ["69c8ec2974cc3249e21483d3", "69c8ec65a8883a4413a87f0b"];

  // Clean up data and set owner
  const processedData = initData.data.map((obj, index) => ({
    ...obj,
    owner: tempUsers[index % 2], // Alternate between the two given users
    geometry: { type: "Point", coordinates: [77.209, 28.6139] }
  }));

  await Listing.insertMany(processedData);
  console.log("Data was initialized in the Cloud!");
  
  mongoose.connection.close(); // Stop the script properly
};
