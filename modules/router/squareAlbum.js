// 引入fs
var fs = require("fs");

function squareAlbum(req, res){
	// 获取目标名
	var targetUsername = req.query.album;
	//console.log("5464" + targetUsername);
	// 获取用户相册名
	fs.readdir("albums/" + targetUsername , function(err, arr){
		//console.log(arr+"sdasdda");
		if(err){
			res.redirect("/error?msg=" + "用户读取文件信息读取失败");
			return;
		}

		// 定义一个空数组，存放每一个相册的里面第一个图片的名字
		var imgarr = [];
		for(var i=0; i<arr.length; i++){
			// 获取用户相册
			// 这里一定要使用同步方法
			var arr1 = fs.readdirSync("albums/" + targetUsername + "/" + arr[i])
			imgarr.push(arr1[0]);
		}
		//console.log(imgarr +"sadasdadasd");
		res.render("squareAlbum",{
			// 用户名
			username: req.session.username,
			// 用户头像
			head_Pic: req.session.head_pic_path,
			// 用户相册名数组
			albumName : arr,
			// 相册名
			imgName : imgarr,
			// 目标用户
			targetUsername : targetUsername
		})
	})
}

// 暴露
module.exports = squareAlbum;