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

const userSchema = Schema({
    username:String,
    email:String
})

const postSchema = Schema({
    content:String,
    like:Number,
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
})

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

const addData = async () => {
    // let user1 = await User.findOne({ username: "anand koshti" });

    // let post2 = new Post({
    //     content: "bye bye",
    //     like: 23,
    // });

    // post2.user = user1;
    let result = await Post.find({}).populate("user");
    console.log(result);

    //     let user1 = new User({
    //         username:"anand koshti",
    //         email:"anand@gmail.com"
    //     })

    //     let post1 = new Post({
    //         content:"Hello hi everyone ",
    //         like:101
    //     })

    //     post1.user = user1;

    //    await user1.save();
};

addData();