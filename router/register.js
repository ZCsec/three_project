const express = require('express')
const register = express.Router();
const db = require('../connect/connection')

register.post('/register',(req,res)=>{
    var sql = 'insert into user(userName,userPwd,userSex,userType) values(?,?,?,default)';
    db.query(sql,[req.body.name,req.body.password,req.body.sex],(err,results)=>{
        if(err) return res.send(err.message);    
        res.redirect('../static/login.html')
    })
})


module.exports = register;