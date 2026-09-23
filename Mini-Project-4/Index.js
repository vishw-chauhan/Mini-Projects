const express= require("express");

const app = express();

const port = 3000;

const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

let posts = [
    {id:uuidv4(),
     username:"Vishw",
     content: "I Am Eager To learn New Things "   
    },
     {  id:uuidv4(),
        username:"Chauhan",
     content: "I Am Eager To learn New Things "   
    },
     {  id:uuidv4(),
        username:"Thakur",
     content: "I Am Eager To learn New Things "   
    }
]

const path= require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))

app.get('/posts',(req,res)=>{
   res.render("index", { posts });
})

app.get("/posts/new",(req,res)=>{
    res.render("new");
})

app.post("/posts",(req,res)=>{

 const post = req.body;
const id = uuidv4();

post.id = id;

posts.push(post);

res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{ 

    const id = req.params.id; 

    const post = posts.find((p) => id == p.id); 

    
    res.render("show",{post}); 

})


app.get("/posts/:id/edit",(req,res)=>{ 

    const id = req.params.id; 

    const post = posts.find((p) => id == p.id); 

    
    res.render("update",{post}); 

})


app.get("/posts/:id/delete",(req,res)=>{ 

    const id = req.params.id; 

    const post = posts.find((p) => id == p.id); 

    
    

})


app.delete("/posts/:id",(req,res)=>{

    const id= req.params.id;

    const post = posts.find((p) => id == p.id); 

    posts = posts.filter((p)=>id!==p.id);

    res.redirect("/posts");

})

app.listen(port,()=>{
    console.log('App Is Listening On The Port');


    
});