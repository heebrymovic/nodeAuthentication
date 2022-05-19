
exports.homepage = (req, res) => {

	res.render("index", {title:"homepage"})
}

exports.login = (req, res) => {

	res.render("login", {title:"Login Page"})
}


exports.register = (req, res) => {

	res.render("register", {title:"Registration Page"})
}

exports.users = (req, res) => {

	res.render("admin", {title:"Users Page"})
}

exports.logout = (req, res) => {
	
	const type = req.params.type
	res.cookie(`jwt${type}`, "", {maxAge:"-1"} )

	res.redirect("/login")

}

exports.error = (req, res) => {
	res.status(404).render("404", {title:"Error 404", error:"Page Could not be found"});
}