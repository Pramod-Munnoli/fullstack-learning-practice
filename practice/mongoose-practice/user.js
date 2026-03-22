const mongoose = require("mongoose");
const {Schema} = mongoose;
main().then(()=>{
    console.log("connection success");
}).catch((err)=>{
    console.log(err)
})
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/reltionDemo");
}

const  userSchema = new Schema({
    username:String,
    addresses:[
        {
            location:String,
            city:String,
        },
    ],
});

const User = mongoose.model("User", userSchema);

const addUser = async ()=>{
    let user1 = new User({
        username:"Mahesh",
        addresses:[{
            location:"kurubar galli",
            city:"Kudachi",
        },
      ],
    })
    user1.addresses.push({ location:"bastwad 1 road",
        city:"Belagavi"
    })
    let result = await user1.save();
    console.log(result);
}


addUser();