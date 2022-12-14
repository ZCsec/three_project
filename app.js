const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 挂载cors
app.use(cors())
app.all('*',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})

// 挂载模板
app.engine("art",require("express-art-template"))
app.set("views",path.join(__dirname,"view"))
app.set("view engine","art")

// 挂载静态资源
app.use('/static',express.static(path.join(__dirname,'public')))

// 导入路由
const login = require('./router/login')
const register = require('./router/register')
app.use('/admin',login)
app.use('/admin',register)

app.listen('3000',function(){
    console.log('running at http://127.0.0.1:3000')
})