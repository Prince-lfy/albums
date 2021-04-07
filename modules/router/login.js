const connect = require("../db");
//表单提交要返回一个页面
function login(req,res){
    console.log("登陆检测");
    res.setHeader("Access-Control_Allow-Origin",'*');
    //获取表单提交的数据
    let username = req.query.username;
    let password = req.query.password;
    //连接数据库
    connect(function (err,client) {
        if(err){
            // res.redirect("/error?msg=" + "连接数据库失败");
            res.send({
                error:1,
                data:'连接数据库失败'
            })
            return ;
        }
        const db = client.db('xiangce')
        const collection = db.collection('users')
        collection.findOne({username:username,password:password},function(err,result){
            client.close();
            if(err){
                res.send({
                    error:2,
                    data:'查询数据出错'
                })
                return ;
            }
            //查询数据成功，跳转页面
            // console.log(result);
            // console.log(result.head_pic_path);
            if(result){

                // 设置session
                req.session.username = username;
                //设置默认头像
                req.session.head_pic_path = result.head_pic_path;
                res.send({
                    error:0,
                    data:'欢迎可以登录'
                })
                // res.redirect('/error')
                // res.render("main" ,{
                //     username:req.session.username
                // });
                return;
            }else {
                res.send({
                    error:3,
                    data:'用户名或密码错误'
                })
                return ;
            }
        })

    })



}

module.exports = login