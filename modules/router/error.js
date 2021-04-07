
module.exports = function(req,res) {
	const msg = req.query.msg;
	//渲染页面
	res.render("error",{
		msg:msg
	});
}
