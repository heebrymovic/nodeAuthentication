
const {UserModel} = require("../model/userModel")

exports.userIndex = async (req, res) => {
	
	const id = req.params.id;

	try{
		const user = await UserModel.findById(id);

		res.render("user", {title:"UserPage", user});
		
	} catch(err){

		res.status(404).render("404",{title:"Error 404", error:"User Not Found"})
	}
	
}