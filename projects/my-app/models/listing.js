const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: String,
    image: { 
        filename: String,
        url: {
             type: String,
             default: "https://unsplash.com/photos/a-small-cabin-in-the-middle-of-a-forest-hzEJGVijmVU",
             set: (v)=> v === "" ? "https://unsplash.com/photos/a-small-cabin-in-the-middle-of-a-forest-hzEJGVijmVU" : v
        }
    },
    price:Number,
    location:String,
    country:String,
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;