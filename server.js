const express = require("express");

const app =express();

const Sequelize = require("sequelize");

const sequelize = new Sequelize('db_proj', 'rarespopa', '123qweasdzxc', {
    dialect: "mysql",
    host: "localhost"
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.log(err)
    console.log("Unable to connect to database")
})

app.get("/hello",(req,res)=>{
    res.status(200).json({ message: 'Hello World' });
})

app.get('/messages',(req,resp)=>{
    resp.status(500).send("Get /messages not implemented")
})

app.get('/messages/:id',(req,res)=>{
    res.status(500).send("Get /messages/:id not yet implemented")
})

app.post('messages',(req,res)=>{
    res.status(500).send("POST /messages not implemented")
})

app.put('messages/:id',(req,res)=>{
    res.status(500).send("PUT /messages/:id not implemented")
})

app.delete('messages/:id',(req,res)=>{
    res.status(500).send("DELETE /messages/:id not implemented")
})

app.listen(8080);

