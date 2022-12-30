const express = require('express')
const register = express.Router();
const db = require('../connect/connection')

register.post('/register',(req,res)=>{
    console.log(req.body);
    var sql = "select count(*) from user where userName=?"
    db.query(sql,[req.body.userName],(err,results)=>{
        if(err) return console.log(err.message);
        // console.log(results[0]['count(*)']);
        if(results[0]['count(*)'] != 0){
            // 如果数据表中已存在该用户
            res.send("该用户名已存在!")
        }else{
            var sql1 = 'insert into user(userName,userPwd,userSex,userType) values(?,?,?,default)';
            db.query(sql1,[req.body.userName,req.body.userPwd,req.body.userSex],(err,results)=>{
                if(err) return res.send(err.message);    
                res.send("注册成功")
            })
        }
    })
})


module.exports = register;