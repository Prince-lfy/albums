module.exports = function(req,res) {
	res.render("main" ,{
		username:req.session.username

	});
}
