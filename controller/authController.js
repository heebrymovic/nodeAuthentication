	
const {UserModel} = require("../model/userModel"); 

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const {SecretKey} = require("../config");

const fs = require("fs")

/*
	400 - bad request
	401 - Unauthorized
	200 - Ok
	201 - Created
*/

exports.register = async (req, res) => {

	const { username, password } =  req.body;

	const file = req.file;

	if( password.length < 6){

		fs.unlinkSync(`./public/assets/uploads/${file.filename}`);

		return res.status(400).json({message:"password lesser than six characters"})

	}

	const data = {username, password, picture:file.filename}

	try{

		const hashPassword = await bcryptjs.hash(password, 10);

		data.password = hashPassword;

		const user  = await UserModel(data).save();

		res.status(200).json({ message:"User Registration Successfull, Try to Log In", user})

	} catch(err){
		fs.unlinkSync(`./public/assets/uploads/${file.filename}`);
		res.status(401).json({message:"User Registration Failed", error:"Username Already Exist"})
	}

}

exports.login = async( req, res ) => {

	const { username, password } = req.body;

	if( !username || !password){


		return res.status(400).json({message:"Username or Password not present"});
	}

	try{

		const user = await UserModel.findOne({username});

		if( user ){

			const hashPassword = await  bcryptjs.compare(password, user.password);
				
			if( hashPassword ){

				const maxAge = 60 * 60 * 5;

				const signToken = jwt.sign({ id:user._id, username, password },SecretKey,{
					expiresIn:maxAge
				})

				res.cookie(`jwt${user.role}`,signToken,{ maxAge: maxAge * 1000 })


				res.status(200).json({message:"Login Successfull, Wait While you are being redirected to the login page", user})

			} else{

				res.status(401).json({message:"Login Failed", error:"Invalid Password"})		
			}

		} else{

			res.status(400).json({message:"Login Not Successfull", error:"User Not Found"})
		}

	} catch(err){
		res.status(400).json({message:"An error Occured",error:err.message})
	}
}


exports.update = async( req, res) => {

	const { id } = req.body;

	/*Check of Role and Id Present*/
	if(id){

		try{

			const user = await UserModel.findById(id);

			if( user ){

				if( user.role === "admin"){

				res.status(400).json({message:"User Already an Admin"});

				} else{
					user.role  = "admin";

					try{
						
						await user.save();

						res.status(201).json({message:"Update Successful", user})

					}catch(err){
						res.status(400).json({message:"An error Occured", error:err.message})
						process.exit(1)
					}
				}

			} else{
				res.status(400).json({message:"Invalid user Id"});
			}
			

		} catch(err){
			res.status(400).json({message:"An error Occured", error:err.message})
		}

	} else{
		res.status(400).json({message:"Id Not Present"})
	}

}

exports.deleteUser = async( req, res )=>{

	const {id} = req.body;

	try{
		const user = await UserModel.findByIdAndDelete(id);

		fs.unlinkSync(`./public/assets/uploads/${user.picture}`);
		
		res.status(201).json({message:"User Deleted Successfully", user});

	}catch(err){
		res.status(400).json({message:"Failed to delete User", error:err.message})
	}
}