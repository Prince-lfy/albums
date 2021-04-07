// 引入fs模块
var fs = require("fs");

function create_album(req, res){
    console.log('创建相册')
    // 获取要创建的文件夹名
    var albumName = req.query.albumName
    // 创建文件夹
    fs.mkdir("./albums/" + req.session.username + "/" + albumName, function(err){
        if(err){
            res.send({
                error: 1,
                data: "创建文件夹失败"
            })
            return;
        }
        res.send({
            error: 0,
            data : "创建文件夹成功"
        })
    })

}
module.exports = create_album;