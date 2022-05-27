
const {DevModel} = require("../model/devModel");

const {UserModel} = require("../model/userModel");

const {generateApiKey,hash} = require("../extras")

const crypto = require("crypto");

exports.devRegister = async (req, res) => {
		
	let {email, host} = req.body;

	let today = Date.now();

	try{

		let apiKey = generateApiKey();

		let hashKey = await hash(apiKey);

		let devEmail = await DevModel.findOne({email});

		if(devEmail){
			return res.status(400).json( {message:"Email Already Exist"} )
		}

		let user = await DevModel({email, host, apiKey:hashKey, usage:[{date:today, count:0}]} ).save()

		res.status(201).json({message:"Developer Registration Successfull", user:{id:user._id, apiKey} });

	}catch(err){

		res.status(400).json( {message:"An Error Occurred",error:err.message} )
	}
}

exports.devViewRender = (req, res) => {

	res.render("developer", {title:"Developer Section"})
}

exports.devTestApi = (req, res) => {
	res.render("api", {title:"Developer Api"})
}

exports.devGetUsers = async(req, res) => {

		const users = await UserModel.find();
		res.status(200).json({message:"Request Successfull",users} )
}

