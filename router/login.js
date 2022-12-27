const express = require('express')
const login = express.Router();
const db = require('../connect/connection')

login.post('/login',(req,res)=>{
    var sql = 'select * from user';
    var bool = true;
    db.query(sql,(err,results)=>{
        if(err) return res.send(err.message);
        for(var i=0;i<results.length;i++){
            if(results[i].userName == req.body.name && results[i].userPwd == req.body.password){
                // 账号密码全对的情况 但是是普通用户
                bool = false;
                var url = 'http://127.0.0.1:3000/admin/loginType'+'?userType=' + results[i].userType + '&userId=' + results[i].userId;
                return res.redirect(url)
            }
        }
        // 账号和密码错误情况
        if(bool){
            res.redirect('../static/login.html')
        }
    })
})


login.get('/loginType',async(req,res)=>{
    if(req.query.userType == 1){
        // 普通用户 直接给模板套数据
        var sql = 'select * from goods';
        db.query(sql,(err,results)=>{
            // console.log(results);
            if(err) return res.send(err.message);
            res.render("index",{goods:results,userId:req.query.userId,userType:req.query.userType})
        })
    }else if(req.query.userType == 0){
        // 超级管理员登录
        // 获取当前页数
        var page = req.query.page || 1;
        // 每页显示数量
        var pageSize = 10;
        // 总条数
        var count = await p;
        // 总页数
        var total = Math.ceil(count/pageSize);
        var sql = 'select * from user limit ?,?';
        db.query(sql,[(page-1)*pageSize,pageSize],(err,results)=>{
            if(err) return console.log(err.message);
            res.render("userAdmin",{usersData:results,userId:req.query.userId,userType:req.query.userType,page:page,total:total})
        })
    }
})

// 数据总数
var p = new Promise((resolve,reject)=>{
    var sql = "select count(*) as count from user"
    db.query(sql,(err,results)=>{
        if(err) return console.log(err.message);
        resolve(results[0].count)
    })
})


login.get('/goodsDetail',(req,res)=>{
    // 获取商品id  用户类型
    var goodsId = req.query.goodsId;
    var userType = req.query.userType;
    var userId = req.query.userId;
    // console.log(goodsId);
    var sql = 'select * from goods where goodsId = ?';
    db.query(sql,[goodsId],(err,results)=>{
        if(err) return console.log(err.message);
        // goodsMsg 商品详情信息  userType 用户类型
        // console.log(results);
        res.render("detail",{goodsMsg:results,userType:userType,userId:userId})
    })
})

// 点击加入购物车时对购物车表(shopCart)增加数据
login.post('/shopCartMsg',(req,res)=>{
    // 数据获取成功
    // console.log(req.body);
    var goodsName = req.body.goodsName;
    var goodsNum = req.body.goodsNum;
    var goodsId = req.body.goodsId;
    var goodsSize = req.body.goodsSize;
    var sql1 = 'SELECT * FROM shopcart JOIN goods ON shopcart.`goodsId` = goods.`goodsId` WHERE goodsName = ? and goodsSize = ?'
    db.query(sql1,[goodsName,goodsSize],(err,results)=>{
        if(err) return console.log(err.message);
        // console.log(results);
        if(results.length == 0){
            // 如果该商品在购物车表中不存在，则添加一条新的数据
            // sql语句 向shopCart表 添加数据
            var sql = 'insert into shopcart(goodsId,goodsNum,userId,goodsPrice,totalPrice,goodsSize) values(?,?,?,?,?,?)';
            db.query(sql,[req.body.goodsId,req.body.goodsNum,req.body.userId,req.body.goodsPrice,req.body.totalPrice,req.body.goodsSize],(err,results)=>{
                if(err) return console.log(err.message);
                if(results.affectedRows == 1){
                    res.send("添加成功")
                }
            })
        }else{
            // 如果该商品在购物车表中存在，则在原有基础上增加数量
            // results[0].goodsNum 该商品在数据库中存在的数量
            var newNum = parseInt(results[0].goodsNum)+parseInt(goodsNum);
            var goodsPrice = req.body.goodsPrice;
            var goodsSize = req.body.goodsSize;
            var totalPrice = newNum * goodsPrice;
            // console.log(totalPrice);
            // 获取新的商品数量  原有数量+本次新增数量
            var sql2 = 'UPDATE shopcart SET goodsNum= ?,totalPrice=? WHERE goodsId = ? and goodsSize = ?'
            db.query(sql2,[newNum,totalPrice,goodsId,goodsSize],(err,results)=>{
                if(err) return console.log(err.message);
                if(results.affectedRows == 1){
                    res.send("添加成功")
                }
            })
            // console.log("该商品ID为"+goodsId);
            // console.log("该商品数量为"+results[0]['COUNT(*)']);
            // console.log("这次商品要添加的数量为"+goodsNum)
            // console.log("新的数量为"+newNum);
        }
    })


})

// 跳转购物车的接口
login.get('/getShopCart',(req,res)=>{
    var userId = req.query.userId;
    var userType = req.query.userType;
    // console.log(userType);
    var sql = 'SELECT * FROM shopcart JOIN goods ON shopcart.`goodsId` = goods.`goodsId` WHERE userId = ?';
    db.query(sql,[userId],(err,results)=>{
        if(err) return console.log(err.message);
        // console.log(results);
        res.render("shopcart",{shopCartData:results,userId:userId,userType:userType})
    })
})

// 购物车内操作更新接口
login.post('/updateShopCart',(req,res)=>{
    // console.log(req.body);  
    var sql = 'UPDATE shopcart SET goodsNum = ?,totalPrice=? WHERE cartId = ?'
    db.query(sql,[req.body.goodsNum,req.body.totalPrice,req.body.cartId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.send("修改成功")

        }
    })
})

// 购物车页面内删除操作接口
login.post('/delGoods',(req,res)=>{
    var cartIds = req.body.cartId;
    console.log(req.body);
    var sql = 'DELETE FROM shopcart WHERE cartId = ?';
    db.query(sql,[cartIds],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.send("删除成功")
        }
    })
})
// 结算后删除购物车内商品操作接口
login.post('/delShopCart',(req,res)=>{
    var cartIds = req.body.cartId;
    console.log(req.body);
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


// 跳转进花店的接口
login.get('/goodList',async(req,res)=>{
    // 获取当前页数
    var page = req.query.page || 1;
    // 每页显示数量
    var pageSize = 9;
    // 总条数
    var count = await p;
    // 总页数
    var total = Math.ceil(count/pageSize);
    var sql = 'select * from goods limit ?,?'
    db.query(sql,[(page-1)*pageSize,pageSize],(err,results)=>{
        if(err) return console.log(err.message);
        res.render("goodslist",{goodsMsg:results,userType:req.query.userType,userId:req.query.userId,page:page,total:total})
    }) 
    
})

// 数据总数
var p = new Promise((resolve,reject)=>{
    var sql = "select count(*) as count from goods"
    db.query(sql,(err,results)=>{
        if(err) return console.log(err.message);
        resolve(results[0].count)
    })
})

module.exports = login;