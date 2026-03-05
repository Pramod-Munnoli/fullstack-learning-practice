import Frute from "./fruts/index.js";
console.log(Frute);


import figlet from "figlet";
figlet("Hello", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        return;
    }
    console.log(data);
});