const mongoose = require("mongoose");


const chat= require("./models/chat.js");

// MongoDB Connection
async function main() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/mongoose_demo"
        );

        console.log("MongoDB connected successfully");



        const chatArray = [
    {
        from: "vishw",
        to: "Babe",
        msg: "Love You",
        date: new Date()
    },
    {
        from: "Babe",
        to: "vishw",
        msg: "Love you too! ❤️",
        date: new Date()
    },
    {
        from: "vishw",
        to: "Babe",
        msg: "How is your day going?",
        date: new Date()
    }
];
     



chat.insertMany(chatArray).then((res)=>{
    console.log("All Chats Are Updated");
    console.log(res);
    
}).catch((err)=>{
    console.log(err);
})

    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}
// Run MongoDB function
main();
