const express = require("express");

const app =express();
app.use(express.json())
app.use(express.urlencoded())

const Sequelize = require("sequelize");

const sequelize = new Sequelize('db_proj', 'rarespopa', '123qweasdzxc', {
    dialect: "mysql",
    host: "localhost"
})

sequelize.authenticate().then(() => {
    console.log("Database is up and running")
}).catch((err) => {
    console.log(err)
    console.log("Unable to connect to database")
})

const Messages = sequelize.define('message', {
    subject: Sequelize.STRING,
    name: Sequelize.STRING,
    message: Sequelize.TEXT
})

app.get('/createdb',(request, response)=>{
    sequelize.sync({force:true}).then(()=>{
        response.status(200).send('tables created')
    }).catch((err)=>{
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.get("/hello",(req,res)=>{
    res.status(200).json({ message: 'Hello World' });
})

app.get('/messages',(req,resp)=>{
    Messages.findAll().then((result) => {
        resp.status(200).json(result)
    })
})

app.get('/messages/:id',(req,res)=>{
     Messages.findByPk(req.params.id).then((result) => {
       if(result){
           resp.status(200).json(result)
       } else{
           resp.status(404).send("resource not found")
       }
   }).catch((err)=>{
       console.log(err)
       res.status(500).send("database error")
   })
})

app.post('/messages',(req,res)=>{
    Messages.create(req.body).then((result)=>{
        res.status(201).json(result)
    }).catch((err)=>{
        res.status(500).send("resource not created")
    })
})

app.put('messages/:id',(req,res)=>{
    res.status(500).send("PUT /messages/:id not implemented")
})

app.delete('messages/:id',(req,res)=>{
    res.status(500).send("DELETE /messages/:id not implemented")
})

app.listen(8080);

