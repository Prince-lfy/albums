
var connect = require("../db");
module.exports = function(req,res) {
		var type = req.body.type;
		var value = req.body.val;

		console.log(type,value);
		connect(function(err,client) {
			if(err){
				res.send({
					error:1,
					data:"连接数据库失败"
				});
				return ;
			}
			var obj = {}
			obj[type]=value;
			var db = client.db("xiangce");
			var users = db.collection("users");
			users.updateOne({username:req.session.username},{$set:obj},function(err,result) {
				if(type=== "password"){
					req.session.username = "";
				}
				client.close();
				if(err){
					res.send({
						error:2,
						data:"修改失败"
					});
					return ;
				}
				res.send({
						error:0,
						data:"修改成功"
					});
				
			});
		});
		
}
