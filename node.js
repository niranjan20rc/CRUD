// Require
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");



// Files
const filepath = path.join(__dirname,"mongodb.json");

if(!fs.existsSync(filepath)){
    fs.writeFileSync(filepath,"[]")
}


// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Port No
const PORT = 5000;


// API - Routes

// GET
app.get("/users",(req,res)=>{
    const data = JSON.parse(fs.readFileSync(filepath,"utf-8"));
    res.json(data);
})



// POST
app.post("/users",(req,res)=>{
    const newUser = req.body;
    const data = JSON.parse(fs.readFileSync(filepath,"utf-8"));
    data.push(newUser)
    fs.writeFileSync(filepath,JSON.stringify(data,null,2));
    res.json(newUser);

}) 


// PUT
app.put("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const {name,phone,email} = req.body;
    const data = JSON.parse(fs.readFileSync(filepath,"utf-8"));
     data[id] = {name,phone,email};
     fs.writeFileSync(filepath,JSON.stringify(data,null,2),"utf-8");
     res.json({data:data[id]})
})




// DELETE
app.delete("/users/:id",(req,res)=>{
const id = parseInt(req.params.id);
let data = JSON.parse(fs.readFileSync(filepath,"utf-8"));
const deletedUser= data.splice(id,1);
fs.writeFileSync(filepath,JSON.stringify(data,null,2));
res.json({deletedUser});
})


// Server Run
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:5000 `)
})