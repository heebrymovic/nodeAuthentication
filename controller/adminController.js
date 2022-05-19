
const {UserModel} = require("../model/userModel")

let userId = "";

exports.adminIndex = async (req, res) => {

	 userId = req.params.id;

	try{
		const user = await UserModel.findById(userId);

		res.render("admin", {title:"Admin Page",user })
	} catch(err){
		res.status(404).render("404",{title:"Error 404", error:"Administrator Access Allowed"})
	}
	
}

exports.listUsers = async (req, res) => {

	try{

		let Users = await UserModel.find();
		
		res.render("listUsers", {title:"Lists Of Users", users:Users, user:{_id:userId}})

	}catch(err){
		res.redirect("404", {title:"Error Page", error:err.message})
	}
}