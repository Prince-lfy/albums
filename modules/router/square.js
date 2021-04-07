// 引入数据库
var connect = require("../db");

function square(req, res){
	// 连接数据库
	connect(function(err, client){
		if(err){
			res.redirect("error?msg=" + "连接数据库失败");
			return;
		}
		// 获取数据库名
		var db = client.db("xiangce");
		// 获取集合名
		var users = db.collection("users");

		// 查找所有用户
		users.find({}).toArray(function(err, arr){
			// 关闭数据库
			client.close();
			if(err){
				res.redirect("error?msg=" + "查找用户失败");
				return;
			}
			// 渲染页面
			res.render("square", {
				username : req.session.username,
				head_Pic : req.session.head_pic_path,
				usersArr : arr
			})
		})
	})
}

// 暴露
module.exports = square;