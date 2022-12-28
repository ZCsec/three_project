const express = require('express');
const address = express.Router();
const db = require('../connect/connection')

address.post('/setAddress',(req,res)=>{
    var userAddress = req.body.province + req.body.city + req.body.district + req.body.addressMsg + "   收件人：" + req.body.userMsg + "   联系电话：" + req.body.phoneMsg;
    var url = `http://127.0.0.1:3000/admin/loginType?userType=${req.query.userType}&userId=${req.query.userId}&province=${req.query.province}`;
    // console.log(userAddress);
    var sql = 'update user set userAddress=? where userId=?';
    db.query(sql,[userAddress,req.query.userId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            // console.log("修改地址成功");
            res.redirect(url)
        }
    })
})


module.exports = address;