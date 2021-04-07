
var connect = require("../db");

module.exports = function(req,res) {
    let album_name = req.query.album_name;
    let username = req.session.username;
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
        var query ={
            username:username,
            albumName:album_name

        }

        imgInfo.find(query).toArray(function(err,arr) {
            client.close();
            //console.log(arr);
            if(err){
                res.send({
                    error:2,
                    data:"查询数据库失败"
                });
                return ;
            }
            res.send({
                error:0,
                data:{
                    username:username,
                    albumName:album_name,
                    dir:"albums",
                    imgs_arr:arr
                }
            });
        });
    });
}
