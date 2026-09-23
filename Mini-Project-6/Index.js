const express = require("express");
const mongoose = require("mongoose");
const chat = require("./models/chat.js");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");

app.use(methodOverride("_method"));



// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// MongoDB Connection
async function main() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/mongoose_demo"
        );

        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

main();


// ================= ROUTES =================


// Home - Show all chats
app.get("/", async (req, res) => {

    const allchats = await chat.find();

    res.render("home", { allchats });
});


// Create Chat Form
app.get("/create", (req, res) => {

    res.render("create");

});


// Create Chat
app.post("/create", async (req, res) => {

    const newchat = await chat.create({

        from: req.body.from,
        to: req.body.to,
        msg: req.body.msg,
        date: new Date()

    });

    console.log("Chat created:", newchat);

    res.redirect("/");
});


// Edit Chat Form
app.get("/:id/edit", async (req, res) => {

    const { id } = req.params;

    const updatedchat = await chat.findById(id);

    res.render("edit", { updatedchat });

});

app.put("/:id/edit", async (req, res) => {
       const {id}= req.params;

       await chat.findByIdAndUpdate(id ,{
        msg:req.body.msg
       })

       res.redirect("/");
});


app.delete("/:id", async (req, res) => {

    const { id } = req.params;

    await chat.findByIdAndDelete(id);

    res.redirect("/");
});

// Start Server
app.listen(port, () => {

    console.log(`Server is running on http://localhost:${port}`);

});