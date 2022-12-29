const e = require('express');
const express = require('express');
const shopCart = express.Router();
const db = require('../connect/connection')


// 结算后删除购物车内商品操作接口
shopCart.post('/delShopCart',(req,res)=>{
    var cartIds = req.body.cartId;
    // console.log(req.body);
    for(let i=0;i<cartIds.length;i++){
        var sql = 'DELETE FROM shopcart WHERE cartId = ?';
        db.query(sql,[cartIds[i]],(err,results)=>{
            if(err) return console.log(err.message);
            if(results.affectedRows == 1){
                if(i==0){
                    res.send("删除成功")
                }
            }
        })
    }
})


shopCart.post('/getPay',(req,res)=>{
    // console.log(req.body);
    var sql = 'insert into orders(goodsAll,orderPrice,userId,orderState,orderTime) values(?,?,?,default,?)';
    var goodsAll =JSON.stringify(req.body.goodsAll);

    if(goodsAll.length != 2){
        db.query(sql,[goodsAll,req.body.orderPrice,req.body.userId,req.body.orderTime],(err,results)=>{
            if(err) return console.log(err.message);
            if(results.affectedRows == 1){
                var orderId = results.insertId;
                // console.log(typeof(orderId));
                res.send(orderId.toString())
            }
        })
    }else{
        res.send("请选中商品")
    }
})



module.exports = shopCart;