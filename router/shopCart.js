const express = require('express');
const shopCart = express.Router();
const db = require('../connect/connection')

shopCart.post('/getPay',(req,res)=>{
    // console.log(req.body);
    var sql = 'insert into orders(goodsAll,orderPrice,userId,userAddress,orderState,orderTime) values(?,?,?,default,default,?)';
    var goodsAll =JSON.stringify(req.body.goodsAll);

    db.query(sql,[goodsAll,req.body.orderPrice,req.body.userId,req.body.orderTime],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            var orderId = results.insertId;
            // console.log(typeof(orderId));
            res.send(orderId.toString())
            // console.log(results);
        }
    })
})



module.exports = shopCart;