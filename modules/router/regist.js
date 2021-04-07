//引入数据库
const connect = require('../db')
//引入fs模块
const fs = require('fs')
//引入formidable
const formidable = require('formidable')

function regist(req,res){
    console.log('注册验证')
    res.setHeader("Access-Control-Allow-Origin","*");
    const form = new formidable()
    //解析数据
    form.parse(req,function(err,fields,files){
            if(err){
                res.send({
                    error:1,
                    data:'解析数据失败'
                })
                return;
            }

        const username = fields.username
        const pass = fields.password
        //创建用户文件夹
        fs.mkdir("albums/" + username,function(err) {
            if(err){
                res.send({
                    error:2,
                    data:"创建文件夹失败"
                });
                return ;

            }
            //插入数据库
            let obj = {
                username:username,
                password:pass,
                age:'',
                worK:'',
                sex:'',
                email:'',
                head_pic_path:'/web/imgs/head/default/default.jpg',
                role:'普通用户'
            }
            connect(function(err,client){
                //获取数据库、集合；再插入
                const db = client.db("xiangce");
                const collection = db.collection("users");
                if(err){
                    res.send({
                        error:3,
                        data:"连接数据库失败"
                    });
                    return ;
                }
                collection.insertOne(obj,function(err,result){
                    //关闭数据库
                    client.close()
                    if(err){
                        res.send({
                            error:4,
                            data:"插入数据失败"
                        });
                        return ;
                    }
                    if(result){
                        res.send({
                            error:0,
                            data:"注册成功"
                        });
                        return ;
                    }else {
                        res.send({
                            error:5,
                            data:"注册失败"
                        });
                        return ;
                    }

                })
            })


        })
    })
}

module.exports = regist