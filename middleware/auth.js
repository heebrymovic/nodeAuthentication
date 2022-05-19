
const jwt = require("jsonwebtoken");

const {SecretKey} = require("../config");

async function loadAuth(token, res, next) {
	if( token ){

		try{
			const decoded = await jwt.verify(token, SecretKey);

			if( decoded.id && decoded.password){
				next();
			} else{
				res.status(401).json({message:"Not Authorized"})
			}

		} catch(err){
			res.status(401).json({message:"Not Authorized", error:err.message})
		}

	} else{
		res.status(401).json({message:"Not Authorized, Token Not Available"})
	}
}



exports.adminAuth = async (req, res, next) => {

	const token = req.cookies.jwtadmin;

	await loadAuth(token, res, next)

	
}

exports.userAuth = async (req, res, next) => {
		
	const token = req.cookies.jwtbasic;
	
	await loadAuth(token, res, next)	
}	

