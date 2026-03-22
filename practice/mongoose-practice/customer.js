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

const  orderSchema = new Schema({
    item:String,
    price:Number,
});

const customerSchema = new Schema({
    name:String,
    orders:[
        {
            type: Schema.Types.ObjectId,
            ref:"Order"
        },
    ],
})

const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model("Order", orderSchema);

const addCustomer = async ()=>{
    // let cust1 = new Customer({
    //     name:"Vinay Kumar",
    // });

    // let orders1 = await Order.findOne({item: "Pizaa"});
    // let orders2 = await Order.findOne({item: "Misal"});

    // cust1.orders.push(orders1);
    // cust1.orders.push(orders2);

    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};

addCustomer();


// const addUser = async () => {
//    let result = await Order.insertMany([
//         { item: "Pizaa", price: 200 },
//         { item: "Burger", price: 100 },
//         { item: "Sandwich", price: 140 },
//         { item: "Samosa", price: 50 },
//         { item: "Misal", price: 100 },
//     ]);
//     console.log(result);
// };

// addUser();

