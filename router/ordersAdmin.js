const express = require('express');
const ordersAdmin = express.Router();
const db = require('../connect/connection')
const moment = require('moment')

ordersAdmin.get('/getOrdersAll',async(req,res)=>{
    // console.log(req.query);
    // 获取当前页数
    var page = req.query.page || 1;
    // 每页显示数量
    var pageSize = 10;
    // 总条数
    var count = await p;
    // 总页数
    var total = Math.ceil(count/pageSize);
    var sql = 'select * from orders limit ?,?'
    db.query(sql,[(page-1)*pageSize,pageSize],(err,results)=>{
        if(err) return console.log(err.message);
        res.render("ordersAdmin",{ordersData:results,userId:req.query.userId,userType:req.query.userType,page:page,total:total})
    })
})

// 数据总数
var p = new Promise((resolve,reject)=>{
    var sql = "select count(*) as count from orders"
    db.query(sql,(err,results)=>{
        if(err) return console.log(err.message);
        resolve(results[0].count)
    })
})

// 订单的增改
ordersAdmin.get('/getOrderType',(req,res)=>{
    var type = req.query.type;
    if(type == 1){
        // 新增订单
        res.render("ordersAdmin-edit",{type:type,userId:req.query.userId,userType:req.query.userType,page:req.query.page})
    }else if(type == 2){
        // 修改商品操作
        var orderId = req.query.nowOrderId;
        // console.log(orderId);
        var sql = 'select * from orders where orderId = ?';
        db.query(sql,[orderId],(err,results)=>{
            results =  formatDate(results);
            if(err) return res.send(err.message);
            res.render("ordersAdmin-edit",{type:type,orders:results[0],userType:req.query.userType,userId:req.query.userId,page:req.query.page,orderId:req.query.orderId});
        })
    }
})

ordersAdmin.post('/addOrder',(req,res)=>{
    var sql = 'insert into orders(goodsAll,orderPrice,userId,userAddress,orderState,orderTime) values (?,?,?,?,?,?)'
    var url = `http://127.0.0.1:3000/admin/getOrdersAll?userType=${req.query.userType}&userId=${req.query.userId}`;
    db.query(sql,[req.body.goodsAll,req.body.orderPrice,req.body.userId,req.body.userAddress,req.body.orderState,req.body.orderTime],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url)
        }
    })
})

// 改
ordersAdmin.post('/updateOrder',(req,res)=>{
    var sql = 'update orders set goodsAll=?,orderPrice=?,userId=?,userAddress=?,orderState=?,orderTime=? where orderId=?'
    var url = `http://127.0.0.1:3000/admin/getOrdersAll?userType=${req.query.userType}&userId=${req.query.userId}&page=${req.query.page}`;
    // console.log(req.body);
    db.query(sql,[req.body.goodsAll,req.body.orderPrice,req.body.userId,req.body.userAddress,req.body.orderState,req.body.orderTime,req.query.orderId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url)
        }
    })
})

// 删
ordersAdmin.post('/delOrder',(req,res)=>{
    console.log(req.query);
    var sql = 'delete from orders where orderId=?'
    var url = `http://127.0.0.1:3000/admin/getOrdersAll?userType=${req.query.userType}&userId=${req.query.userId}&page=${req.query.page}`;
    db.query(sql,[req.query.nowOrderId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url);
        }
    })
})


function formatDate(result){
    for(var i=0;i<result.length;i++){
        result[i].orderTime = moment(result[i].orderTime).format('YYYY-MM-DD HH:mm:ss')
    }
    return result;
}

module.exports = ordersAdmin;