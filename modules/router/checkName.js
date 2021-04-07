const connect = require('../db')
function checkName(req,res){
    console.log("检测数据库数据：用户名");
    res.setHeader('Access-Control-Allow-Origin','*');
    const username = req.query.username
    //连接数据库
    connect(function(err,client){
        if(err){
            res.send({
                error:1,
                data:'连接数据库失败'
            })
            return;
        }
        //连接数据库成功，查询数据
        const dbName = client.db("xiangce")
        const collection = dbName.collection("users")
        collection.findOne({username:username},function(err,result){
            //进入关闭数据库
            client.close();
            if(err){
                res.send({
                    error:2,
                    data:'查询数据失败'
                })
                return
            }
            if(result){
                res.send({
                    error:3,
                    data:'名字已被占用'
                })
                return
            }
            res.send({
                error:0,
                data:'该名字可用'
            })

        })
    })
}

module.exports = checkName;