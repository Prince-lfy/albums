var fs = require("fs");
var formidable = require("formidable");
var connect = require("../db");
function uploadfile(req, res) {
    console.log("插入数据");
    // 获取当前登录用户
    var username = req.session.username;
    // 解析
    var form = new formidable();
    // 设置上传路径
    form.uploadDir = "./uploads";
    // 定义数组
    var imgArr = [];
    // 监听file事件
    form.on("file", function(key, value) {
        imgArr.push(value);
        //console.log("dada" +value);
    })
    // 解析
    form.parse(req, function(err, fields, files) {
        //console.log(arguments,"this arguments");
        // 判定是否解析失败
        if (err) {
            res.send({
                error: 1,
                data: "解析失败"
            });
            return;
        }
        // 获取相册名称
        var albumName = fields.album_name;//select的name属性
        // 定义集合
        var imgInfoArr = [];
        // 循环重命名
        for (var i = 0; i < imgArr.length; i++) {
            // 定义老路径
            var oldPath = imgArr[i].path;
            // 定义新路径
            var newPath = "albums/" + username + "/" + albumName + "/" + imgArr[i].name;
            // 创建一条信息 以备插入到数据库中 该信息中有该图片是否共享字段
            // 因为是多条数据 所以放入数组
            imgInfoArr.push({
                username: username,
                albumName: albumName,
                imgName: imgArr[i].name,
                share:"0",//图片状态：0分享，1私密，
                choose:"0"//1,删除状态，
            })
            fs.renameSync(oldPath,newPath);
        }
        // 连接数据库
        connect(function(err, client) {
            if (err) {
                res.send({
                    error: 2,
                    data: "连接数据库失败"
                });
                return;
            }
            // 获取数据库
            var db = client.db("xiangce");
            // 获取集合
            var imgInfo = db.collection("imgInfo");
            // 调用插入方法
            imgInfo.insertMany(imgInfoArr, function(err, result) {
                client.close();
                if (err) {
                    res.send({
                        error: 3,
                        data: "插入数据库失败"
                    });
                    return;
                }
                res.send({
                    error: 0,
                    data: "操作成功"
                })
            })
        })

    })
}

module.exports = uploadfile;