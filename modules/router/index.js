const router = require('express').Router();
const app = require('express')();

//mian
const main = require("./main");
router.get('/main',main);
//匹配login接口
const login = require('./login.js');
router.get('/login',login);
// //匹配页面,跳转页面
router.get("/web/html/login.html",function(req,res) {
    res.redirect("/login");
});

//匹配checkName接口
const checkName = require('./checkName.js');
router.get('/checkName',checkName)
//匹配regist接口
const regist = require('./regist.js');
router.post('/regist',regist);
//拦截非法请求
//登录拦截器，必须放在静态资源声明之后、路由导航之前
router.use(function (req, res, next) {
    var url = req.originalUrl;
    console.log(url);
    if (url != "/web/html/login.html" && !req.session.username) {
        return res.redirect("/web/html/login.html");
    }
    next();
});






//error
const error = require("./error");
router.get('/error',error);

//management
const management = require("./management");
router.get('/management',management);
//create_album
const create_album = require("./create_album");
router.get('/create_album',create_album);

//deleteAlbum
const deleteAlbum = require("./deleteAlbum");
router.get('/deleteAlbum',deleteAlbum);

//getImg
const getImg = require("./getImg");
router.get('/getImg',getImg);
//upload_img_href
const upload_img_href = require("./upload_img_href");
router.get('/upload_img_href',upload_img_href);
//upload_file
const upload_file = require("./upload_file");
router.post('/upload_file',upload_file);
//get_album_imgs
const get_album_imgs = require("./get_album_imgs");
router.get('/get_album_imgs',get_album_imgs);
//choose_img
const choose_img = require("./choose_img");
router.get('/choose_img',choose_img);
//change_sta
const change_sta = require("./change_sta");
router.get('/change_sta',change_sta);
//del_many_img
const del_many_img = require("./del_many_img");
router.get('/del_many_img',del_many_img);


//del_single_img
const del_single_img = require("./del_single_img");
router.get('/del_single_img',del_single_img);


//person_info
const person_info = require("./person_info");
router.get('/person_info',person_info);

//update_preson_info
const update_preson_info = require("./update_preson_info");
router.post('/update_preson_info',update_preson_info);
/*
* 裁剪图片
*
* */
//yulan
const yulan = require("./yulan");
router.post('/yulan',yulan);
//caijian
const caijian = require("./caijian");
router.get('/caijian',caijian);

//square
const square = require("./square");
router.get('/square',square);
//squareAlbum
const squareAlbum = require("./squareAlbum");
router.get('/squareAlbum',squareAlbum);
//exits
const exits = require("./exits");
router.get('/exits',exits);






module.exports = router;