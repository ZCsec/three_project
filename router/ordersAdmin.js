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
    var sql = 'SELECT orderId,goodsAll,orderPrice,orders.userId,orderState,orderTime,userAddress FROM orders JOIN USER ON orders.`userId` = user.`userId` LIMIT ?,?'
    db.query(sql,[(page-1)*pageSize,pageSize],(err,results)=>{
        if(err) return console.log(err.message);
        // console.log(typeof(results[0].goodsAll));
        for(var i=0;i<results.length;i++){
            results[i].goodsAll = JSON.parse(results[i].goodsAll)
            results[i].orderTime = moment(results[i].orderTime).format('YYYY-MM-DD HH:mm:ss')
        }
        // console.log(typeof(results[0].goodsAll));
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


// 后台查询接口
ordersAdmin.post('/getSearchOrders',async(req,res)=>{
    // console.log(req.body.content);
    var content = '%' + req.body.content + '%' || req.query.searchContent;

    // 获取当前页数
    var searchPage = req.query.searchPage || 1;

    // 每页显示数量
    var pageSize = 10;
    // 总条数
    var count = await getP(content);
    // 总页数
    var total = Math.ceil(count/pageSize);
    var sql = 'SELECT * FROM orders WHERE goodsAll LIKE ? limit ?,?';
    db.query(sql,[content,(searchPage-1)*pageSize,pageSize],(err,results)=>{
        if(err) return console.log(err.message);
        for(var i=0;i<results.length;i++){
            results[i].goodsAll = JSON.parse(results[i].goodsAll)
            results[i].orderTime = moment(results[i].orderTime).format('YYYY-MM-DD HH:mm:ss')
        }
        // console.log(results);
        res.render("orderSearch",{ordersData:results,userId:req.query.userId,userType:req.query.userType,searchPage:searchPage,total:total,searchContent:content})
    })
})

// 后台查询接口
ordersAdmin.get('/getSearchOrders',async(req,res)=>{
    // console.log(req.query.searchContent);
    var content = req.query.searchContent;

    // 获取当前页数
    var searchPage = req.query.searchPage || 1;

    // 每页显示数量
    var pageSize = 10;
    // 总条数
    var count = await getP(content);
    // 总页数
    var total = Math.ceil(count/pageSize);
    var sql = 'SELECT * FROM orders WHERE goodsAll LIKE ? limit ?,?';
    db.query(sql,[content,(searchPage-1)*pageSize,pageSize],(err,results)=>{
        if(err) return console.log(err.message);
        for(var i=0;i<results.length;i++){
            results[i].goodsAll = JSON.parse(results[i].goodsAll)
            results[i].orderTime = moment(results[i].orderTime).format('YYYY-MM-DD HH:mm:ss')
        }
        // console.log(results);
        res.render("orderSearch",{ordersData:results,userId:req.query.userId,userType:req.query.userType,searchPage:searchPage,total:total,searchContent:content})
    })
})


// 数据总数
function getP(content){
    var p = new Promise((resolve,reject)=>{
        var sql = "select count(*) as count from orders where goodsAll like ?"
        db.query(sql,[content],(err,results)=>{
            if(err) return console.log(err.message);
            resolve(results[0].count)
        })
    })
    return p
}



module.exports = ordersAdmin;