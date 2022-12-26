const express = require('express')
const pay = express.Router();
const moment = require('moment')
const db = require('../connect/connection')


pay.post('/pay',(req,res)=>{
    var sql = 'select * from orders where orderId=?';
    db.query(sql,[req.body.orderId],(err,results)=>{
        if(err) return console.log(err.message);
        results =  formatDate(results);
        res.render("payPage",{payMsg:results[0]}); 
    })
})

pay.get('/pay',(req,res)=>{
    var sql = 'select * from orders where orderId=?';
    db.query(sql,[req.query.orderId],(err,results)=>{
        if(err) return console.log(err.message);
        results =  formatDate(results);
        var goodsAll = results[0].goodsAll;
        var goodsAll = JSON.parse(goodsAll)
        res.render("payPage",{payMsg:results[0],goodsAll:goodsAll,orderId:req.query.orderId,userId:req.query.userId,userType:req.query.userType}); 
    })
})

pay.post('/updatePay',(req,res)=>{
    // console.log(req.body);
    var sql = 'update orders set orderState="已支付",orderTime=? where orderId=?';
    db.query(sql,[req.body.time,req.body.orderId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.send("支付成功")
        }
    })

})

pay.get('/getWaitPay',(req,res)=>{
    // console.log(req.query);
    var sql = 'select * from orders where orderState="待支付" and userId=?';
    db.query(sql,[req.query.userId],(err,results)=>{
        if(err) return console.log(err.message);
        results =  formatDate(results);
        for(let i=0;i<results.length;i++){
            var goodsAll = results[i].goodsAll;
            var goodsAll = JSON.parse(goodsAll)
            results[i].goodsAll = goodsAll
        } 
        res.render("order",{payMsg:results,userId:req.query.userId,userType:req.query.userType})
    })
})

pay.get('/delWaitPay',(req,res)=>{
    console.log(req.query);
    var sql = 'delete from orders where orderId=?';
    var url = `http://127.0.0.1:3000/admin/getWaitPay?userId=${req.query.userId}&userType=${req.query.userType}`;
    db.query(sql,[req.query.orderId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url)
        }
    })
})

pay.get('/getPayOrder',(req,res)=>{
    var sql = 'update orders set orderState="已支付",orderTime=? where orderId=?';
    var url = `http://127.0.0.1:3000/admin/getWaitPay?userId=${req.query.userId}&userType=${req.query.userType}`;
    db.query(sql,[req.query.orderTime,req.query.orderId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url)
        }
    })
})

function formatDate(result){
    for(var i=0;i<result.length;i++){
        result[i].orderTime = moment(result[i].orderTime).format('YYYY-MM-DD HH:mm:ss')
    }
    return result;
}

module.exports = pay;