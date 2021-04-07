const express= require('express')
const bodyParser = require('body-parser')
//引入session
const session = require("express-session");
//引入connect-mongo，让sesssion持久化
const connect = require("connect-mongo");
const MongoStore = connect(session);

function conf(app){
    // 静态文件夹
    app.use("/albums/", express.static("./albums"));
    app.use("/web/", express.static("./web"));
    //封装body
    app.use(bodyParser.urlencoded({extended:false}))
    //配置模板引擎,render可是省略ejs后缀名
    app.set("view engine","ejs");


    //配置session
    app.use(session({
        secret:"feiyang",
        resave:false,
        //session持久化
        saveUninitialized:true,
        store: new MongoStore({url: "mongodb://localhost:27017/session"}),
        cookie: {
            maxAge: 60*60*1000
        }
    }));



}




module.exports = conf;