var connect = require("../db");
function choose_img(req, res) {
    console.log('选中图片')
    // 获取当前用户名
    var username = req.session.username;
    // 获取相册名
    var albumName = req.query.albums_name;
    // 获取文件名
    var imgName = req.query.imgname;
    var check_flag=req.query.check_flag;
    var choose = check_flag==='true' ? 1 : 0;
    // 连接数据库
    connect(function(err, client) {
        if (err) {
            res.send({
                error: 1,
                data: "连接数据库失败"
            });
            return;
        }
        // 定位数据库
        var db = client.db("xiangce");
        // 定位集合
        var imgInfo = db.collection("imgInfo");
        // 定义查询对象
        var query = {
            username: username,
            albumName: albumName,
            imgName: imgName
        }
        // 调用修改方法
        imgInfo.update(query, {$set: {choose: choose}},{upsert:true}, function(err, result) {
            client.close();
            if (err) {
                res.send({
                    error: 2,
                    data: "修改失败"
                })
                return;
            }
            res.send({
                error: 0,
                data: "修改成功"
            })
        })
    })
}

module.exports = choose_img;