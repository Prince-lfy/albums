var fs = require("fs");
var connect = require("../db");

module.exports = function(req,res) {
    console.log('批量删除图片');
    var username = req.session.username;
    var albumName = req.query.albums_name;
    connect(function(err,client) {
        if(err){
            res.send({
                error:1,
                data:"连接数据库失败"
            });
            return;
        }
        //获取数据库、集合
        var db = client.db("xiangce");
        var imgInfo = db.collection("imgInfo");
        var query = {
            username:username,
            albumName:albumName,
            choose:1
        }
        imgInfo.find(query).toArray(function(err,arr) {
            if(err){
                client.close();
                res.send({
                    error:2,
                    data:"查找数据失败"
                });
                return;
            }
            //删除磁盘文件

            try{
                for(var i = 0; i<arr.length;i++){
                    fs.unlinkSync("albums/"+ arr[i].username + "/" + arr[i].albumName + "/" +arr[i].imgName);
                }
            }catch(e){
                client.close();
                res.send({
                    error:3,
                    data:"删除磁盘文件失败"
                });
                return;
            }
            //删除数据库文件
            imgInfo.deleteMany(query,function(err,result) {
                client.close();
                if(err){
                    client.close();
                    res.send({
                        error:4,
                        data:"删除失败"
                    });
                    return;
                }
                // 删除成功
                res.send({
                    error: 0,
                    data: "删除成功"
                })
            });

        });
    });
}
