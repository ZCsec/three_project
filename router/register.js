const express = require('express')
const register = express.Router();
const db = require('../connect/connection')

register.post('/register',(req,res)=>{
    var sql = 'insert into user(userName,userPwd,userSex,userType) values(?,?,?,default)';
    db.query(sql,[req.body.userName,req.body.userPwd,req.body.userSex],(err,results)=>{
        if(err) return res.send(err.message);    
        res.send("注册成功")
    })
})


module.exports = register;