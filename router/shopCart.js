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
            res.send("结算成功")
        }
    })
})

module.exports = shopCart;