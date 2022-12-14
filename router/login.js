const express = require('express')
const login = express.Router();
const db = require('../connect/connection')

login.post('/login',(req,res)=>{
    var sql = 'select * from user';
    var bool = true;
    db.query(sql,(err,results)=>{
        if(err) return res.send(err.message);
        for(var i=0;i<results.length;i++){
            if(results[i].userName == req.body.name && results[i].userPwd == req.body.password && results[i].userType == 1){
                // 账号密码全对的情况 但是是普通用户
                bool = false;
                // return res.redirect('../static/index.html')
                
            }else if(results[i].userName == req.body.name && results[i].userPwd == req.body.password && results[i].userType == 0){

            }
        }
        // 账号和密码错误情况
        if(bool){
            res.redirect('../static/login.html')
        }
    })
})


module.exports = login;