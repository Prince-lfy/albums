var gm = require("gm");
const connect = require('../db');
module.exports = function(req,res){
	// 获取宽高xy
	var x = req.query.x;
	var y = req.query.y;
	var w = req.query.w;
	var h = req.query.h;
	console.log(x,y,w,h);
	console.log("45" +req.session.yulan);
	console.log("47"+req.session.head_pic_path);
	let newPath = 'web/imgs/head/now/'+req.session.username+'.jpg';
	req.session.head_pic_path = newPath;
	gm(req.session.yulan).resize(500, 500, '!').crop(w, h, x, y).write(newPath, function(err) {
		if (err) {
			res.send({
				error: 1,
				data: "裁剪失败"
			});
			return;
		}
		//连接数据库，修改头像路径
		connect(function(err,client){
			//获取数据库、集合；再插入
			const db = client.db("xiangce");
			const collection = db.collection("users");
			if(err){
				res.send({
					error: 2,
					data: "连接数据库失败"
				})
				return ;
			}
			collection.update({username:req.session.username},{$set: {head_pic_path: newPath}},function(err,result){
				if(err){
					res.send({
						error: 2,
						data: "连接数据库失败"
					})
					return ;
				}
				res.send({
					error: 0,
					data: "裁剪成功"
				})

			})
		})

	})
}
