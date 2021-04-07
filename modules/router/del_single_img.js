var connect = require("../db");
var fs = require("fs");

module.exports = function(req,res) {
    console.log('删除单个图片');
    var username = req.session.username;
    var albumName = req.query.albums_name;
    var imgName = req.query.imgname;
    connect(function(err,client) {
        if(err){
            res.send({
                error:1,
                data:"连接数据库失败"
            });
            return ;
        }
        var db = client.db("xiangce");
        var imgInfo = db.collection("imgInfo");
        var query = {
            username:username,
            albumName:albumName,
            imgName:imgName
        }
        imgInfo.removeOne(query,function(err,result) {
            client.close();
            if(err){
                res.send({
                    error:2,
                    data:"删除数据库失败"
                });
                return ;
            }
            //删除磁盘文件
            fs.unlink("albums/" + username + "/" + albumName + "/" + imgName, function(err) {
                if(err){
                    res.send({
                        error:3,
                        data:"删除磁盘数据失败"
                    });
                    return ;
                }
                res.send({
                    error:0,
                    data:"删除数据库成功"
                });
            })


        });
    });
}
