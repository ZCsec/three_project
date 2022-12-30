const express = require('express');
const goodsAdmin = express.Router();
const db = require('../connect/connection')

goodsAdmin.get('/getGoodsAll',async(req,res)=>{
    // 获取当前页数
    var page = req.query.page || 1;
    // 每页显示数量
    var pageSize = 10;
    // 总条数
    var count = await p;
    // 总页数
    var total = Math.ceil(count/pageSize);
    var sql = 'select * from goods limit ?,?';
    db.query(sql,[(page-1)*pageSize,pageSize],(err,results)=>{
        if(err) return console.log(err.message);
        // console.log(results);
        res.render("goodsAdmin",{goodsData:results,userId:req.query.userId,userType:req.query.userType,page:page,total:total})
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

goodsAdmin.get('/getGoodsType',(req,res)=>{
    var type = req.query.type;
    if(type == 1){
        // 新增用户操作
        res.render("goodsAdmin-edit",{type:type,userId:req.query.userId,userType:req.query.userType,page:req.query.page});
    }else if(type == 2){
        // 修改商品操作
        var goodsId = req.query.goodsId;
        var sql = 'select * from goods where goodsId = ?';
        db.query(sql,[goodsId],(err,results)=>{
            if(err) return console.log(err.message);
            res.render("goodsAdmin-edit",{type:type,goods:results[0],userType:req.query.userType,userId:req.query.userId,page:req.query.page,goodsId:req.query.goodsId});
        })
    }
})

// 新增商品操作
goodsAdmin.post('/addGoods',(req,res)=>{
    var sql = 'insert into goods(goodsName,goodsPrice,goodsImgSrc,goodsDiscount) values (?,?,?,?)';
    var url = `http://127.0.0.1:3000/admin/getGoodsAll?userType=${req.query.userType}&userId=${req.query.userId}&page=${req.query.page}`;
    db.query(sql,[req.body.goodsName,req.body.goodsPrice,req.body.goodsImgSrc,req.body.goodsDiscount],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url);
        }
    })
}) 

// 修改商品操作
goodsAdmin.post('/updateGoods',(req,res)=>{
    var sql = 'update goods set goodsName=?,goodsPrice=?,goodsImgSrc=?,goodsDiscount=? where goodsId=?';
    var url = `http://127.0.0.1:3000/admin/getGoodsAll?userType=${req.query.userType}&userId=${req.query.userId}&page=${req.query.page}`;
    db.query(sql,[req.body.goodsName,req.body.goodsPrice,req.body.goodsImgSrc,req.body.goodsDiscount,req.query.goodsId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url);
        }
    })
})

// 删除商品操作 
goodsAdmin.post('/delGoodsAdmin',(req,res)=>{
    // console.log(req.body);
    // console.log(req.query);
    // console.log(req);
    var sql = 'delete from goods where goodsId=?'
    var url = `http://127.0.0.1:3000/admin/getGoodsAll?userType=${req.query.userType}&userId=${req.query.userId}&page=${req.query.page}`;
    db.query(sql,[req.query.nowGoodsId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url);
        }
    })
})



module.exports = goodsAdmin;