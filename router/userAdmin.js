const express = require('express')
const userAdmin = express.Router();
const db = require('../connect/connection')

userAdmin.get('/getUserType',(req,res)=>{
    var type = req.query.type;
    if(type == 1){
        // 新增用户操作
        res.render("userAdmin-edit",{type:type,userId:req.query.userId,userType:req.query.userType});
    }else if(type == 2){
        // 只能修改普通用户数据
        if(req.query.nowUserType != 0){ 
            // 修改用户操作
            var nowUserId = req.query.nowUserId;
            var sql = 'select * from user where userId = ?';
            db.query(sql,[nowUserId],(err,results)=>{
                if(err) return res.send(err.message);
                // results[0].birthday = JSON.stringify(results[0].birthday)
                // results[0].birthday = results[0].birthday.substring(1,results[0].birthday.indexOf('T'))
                res.render("userAdmin-edit",{type:type,user:results[0],nowUserId:nowUserId,userType:req.query.userType,userId:req.query.userId,page:req.query.page});
            })
        }
    }
})

userAdmin.post('/addUser',(req,res)=>{
    var url = 'http://127.0.0.1:3000/admin/loginType' + '?userType=' + req.query.userType + '&userId=' + req.query.userId;
    var sql = 'insert into user(userName,userPwd,userSex,userType) values(?,?,?,?)'
    db.query(sql,[req.body.userName,req.body.userPwd,req.body.userSex,req.body.userType],(err,results)=>{
        if(err) return console.log(err.message);
        res.redirect(url)
    })
})

userAdmin.post('/updateUser',(req,res)=>{
    // console.log(req.body);
    // console.log(req.query);
    var url = 'http://127.0.0.1:3000/admin/loginType' + '?userType=' + req.query.userType + '&userId=' + req.query.userId + '&page=' + req.query.page;
    var sql = 'update user set userName=?,userPwd=?,userSex=? where userId = ?';
    db.query(sql,[req.body.userName,req.body.userPwd,req.body.userSex,req.query.nowUserId],(err,results)=>{
        if(err) return console.log(err.message);
        if(results.affectedRows == 1){
            res.redirect(url);
        }
    })
})

userAdmin.post('/delUser',(req,res)=>{
    var url = 'http://127.0.0.1:3000/admin/loginType' + '?userType=' + req.query.userType + '&userId=' + req.query.userId + '&page=' + req.query.page;
    if(req.query.nowUserType != 0){
        // 只能删普通用户
        var sql = 'delete from user where userId = ?';
        db.query(sql,[req.query.nowUserId],(err,results)=>{
            if(err) return console.log(err.message);
            if(results.affectedRows == 1){
                // 删除成功，跳转回
                res.redirect(url)
            }
        })
    }else{
        // res.send("<h1>管理员用户不能删除！</h1>")
        res.redirect(url)
    }

})

// 后台查询接口
userAdmin.post('/getSearchUser',async(req,res)=>{
    var content = req.body.content + '%' || req.query.searchContent;

    // 获取当前页数
    var searchPage = req.query.searchPage || 1;

    // 每页显示数量
    var pageSize = 10;
    // 总条数
    var count = await getP(content);
    // 总页数
    var total = Math.ceil(count/pageSize);
    // console.log(req.body.content);
    // console.log(req.query);
    var sql = 'SELECT * FROM user WHERE userName LIKE ? limit ?,?';
    db.query(sql,[content,(searchPage-1)*pageSize,pageSize],(err,results)=>{
        if(err) return console.log(err.message);
        res.render("userSearch",{usersData:results,userId:req.query.userId,userType:req.query.userType,searchPage:searchPage,total:total,searchContent:content})
    })
})
// 后台查询接口
userAdmin.get('/getSearchUser',async(req,res)=>{
    var content = req.query.searchContent;

    // 获取当前页数
    var searchPage = req.query.searchPage || 1;

    // 每页显示数量
    var pageSize = 10;
    // 总条数
    var count = await getP(content);
    // 总页数
    var total = Math.ceil(count/pageSize);
    // console.log(req.body.content);
    // console.log(req.query);
    var sql = 'SELECT * FROM user WHERE userName LIKE ? limit ?,?';
    db.query(sql,[content,(searchPage-1)*pageSize,pageSize],(err,results)=>{
        if(err) return console.log(err.message);
        res.render("userSearch",{usersData:results,userId:req.query.userId,userType:req.query.userType,searchPage:searchPage,total:total,searchContent:content})
    })
})

// 数据总数
function getP(content){
    var p = new Promise((resolve,reject)=>{
        var sql = "select count(*) as count from user where userName like ?"
        db.query(sql,[content],(err,results)=>{
            if(err) return console.log(err.message);
            resolve(results[0].count)
        })
    })
    return p
}

module.exports = userAdmin;