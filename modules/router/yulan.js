var fs = require("fs");
var formidable = require("formidable");	
function yulan(req, res) {
	// 解析
	var form = new formidable();
	// 设置上传路径
	form.uploadDir = "./uploads";
	// 定义数组
	var imgArr = [];
	// 监听file事件
	form.on("file", function(key, value) {
		imgArr.push(value);
	})
	// 解析
	form.parse(req, function(err, fields, files) {
		// 判定是否解析失败
		if (err) {
			res.send({
				error: 1,
				data: "解析失败"
			});
			return;
		}
		//console.log(err,fields,files);
		// 获取图片名称
		for (var i = 0; i < imgArr.length; i++) {
			// 定义老路径
			var oldPath = imgArr[i].path;
			// 定义新路径
			var newPath = "headPic_img_history/" +  imgArr[i].name;
			fs.renameSync(oldPath, newPath);
		}
		req.session.yulan = newPath;
		res.send({
			error: 0,
			data: "上传成功"
		})
	})
}

module.exports = yulan;