

module.exports = function(req,res) {
	req.session.username = "";
	res.redirect("/web/html/login.html");
}
