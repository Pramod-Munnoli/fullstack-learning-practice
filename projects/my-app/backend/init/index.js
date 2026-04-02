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
    const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

    // Clean up data and set owner
    const processedData = [];
    
    console.log("Starting geocoding for sample listings...");
    for (let i = 0; i < initData.data.length; i++) {
        let obj = initData.data[i];
        let listing = {
            ...obj,
            owner: tempUsers[i % 2],
        };

        const query = `${obj.location}, ${obj.country}`;
        try {
            const response = await fetch(
                `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${MAPTILER_API_KEY}`
            );
            
            if (response.ok) {
                const data = await response.json();
                if (data.features && data.features.length > 0) {
                    listing.geometry = data.features[0].geometry;
                } else {
                    console.warn(`Geocoding failed for: ${query}, using default.`);
                    listing.geometry = { type: "Point", coordinates: [77.209, 28.6139] };
                }
            } else {
                listing.geometry = { type: "Point", coordinates: [77.209, 28.6139] };
            }
        } catch (err) {
            console.error(`Error geocoding ${query}:`, err.message);
            listing.geometry = { type: "Point", coordinates: [77.209, 28.6139] };
        }
        
        processedData.push(listing);
        // Small delay to avoid hitting rate limits too fast (MapTiler is generous but good practice)
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    await Listing.insertMany(processedData);
    console.log("Data was initialized in the Cloud with correct coordinates!");
    
    mongoose.connection.close(); 
};
