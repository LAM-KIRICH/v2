const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const port = 8081 ;
app.use(express.json())
app.use(cors())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"arizona"
})
app.post('/signup',(req,res)=>{
    const sql = 'INSERT INTO Client (`username`, `email`, `password`, `full_name`, `address`, `phone`) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.full_name,
        req.body.address,
        req.body.phone
    ];
    db.query(sql, values, (err,data)=>{
        if(err){
            return res.json('Error')
        }
        res.json(data)
    });
});

app.post('/login',(req,res)=>{
    const sql = 'SELECT * FROM Client WHERE `email` = (?) AND `password` = (?)';
    db.query(sql,[req.body.email , req.body.password],(err,data)=>{
        if(err){
            return res.json('Error')
        }
        if(data.length > 0) {
            return res.json('Success')
        }else {
            res.json('Failed')
        }
    });
});
app.get('/',(req,res)=>{
    const sql = 'SELECT * FROM PropertyListings';
    db.query(sql,(err,data)=>{
        res.json(data)
    })
})

app.listen(port,()=>{
    console.log(`listining at localhost:${port} `)
})
