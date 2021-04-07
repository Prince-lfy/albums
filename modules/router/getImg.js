// 引入fs
var fs = require("fs");
// 引入数据库连接
var connect = require("../db");

function getImg(req, res){
	// 获取相册名
	var albumName = req.query.albumName;
	// 获取用户名
	var username = req.query.username;
	//console.log("我来了"+username,albumName);
	// 获取用户头像
	var head_Pic = req.session.head_Pic;

	// 读取数据库
	connect(function(err,client){
		if(err){
			res.send({
				error : 1,
				data : "访问数据库失败"
			});
			return;
		}
		// 获取数据库
		var db = client.db("xiangce");
		// 获取集合
		var imgInfo = db.collection("imgInfo");
		//判定是否查询自己的相册
		if(username === req.session.username) {
			// 定义查询对象
			var query = {
				username: username,
				albumName: albumName,
			}
		}else {
			var query = {
				username: username,
				albumName: albumName,
				share:0//查询分享的照片,0分享，1私密
			}
		}
		
		
		// 数据库中查询
		imgInfo.find(query).toArray(function(err, arr){
			// 关闭数据库
			client.close();
			// 判断
			if(err){
				res.send({
					error : 2,
					data: "数据库查询失败"
				});
				return;
			}
			// 查询成功
			res.send({
				error: 0,
				username: username,
				head_Pic: head_Pic,
				data : arr,
				dir: "albums"
			})
		})
	})
}

// 暴露
module.exports = getImg;