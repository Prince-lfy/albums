const fs = require('fs')
const connect = require('../db');

function rm(dirPath) {
        console.log('删除')
        // 读取该文件夹
        let arr = fs.readdirSync(dirPath)
        // 循环
        for(var i = 0; i < arr.length; i++) {
            //获取文件的状态
            var state = fs.statSync(dirPath + "/" + arr[i]);
             console.log(dirPath + "/" + arr[i] + (state.isDirectory() ? "是":"不是") + "一个文件夹");
            if (state.isDirectory()) {
                del(dirPath + "/" + arr[i]);
            } else {
                //删除文件 对空或非空的目录均不起作用
                console.log("删除文件");
                fs.unlinkSync(dirPath + "/" + arr[i])
            }
        }
        // 最后删除文件夹
        fs.rmdirSync(dirPath);


}
function del(req,res){
    //获取用户名和相册名称
    const username = req.session.username;
    const albumName = req.query.albumName;
    //删除文件夹
    try{
        rm("albums/" + "/" + username + "/" + albumName);
        //连接数据库，删除数据
        connect(function(err,client){
            if(err){
                res.send({
                    error:1,
                    data:"连接数据库失败"
                });
                return ;
            }
            var db = client.db("xiangce");
            var imgInfo = db.collection("imgInfo");
            var query ={
                username:username,
                albumName:albumName

            }
            imgInfo.deleteMany(query,function(err,result){
                if(err){
                    res.send({
                        error:2,
                        data:"删除数据失败"
                    });
                    return ;
                }

            })
        })
    }catch(e){
        res.send({
            error: 1,
            data: "删除文件失败"
        })
        return;
    }
    res.send({
        error: 0,
        data: "删除文件成功"
    })
}

module.exports = del