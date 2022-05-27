
const jwt = require("jsonwebtoken");

const {SecretKey} = require("../config");

async function loadAuth(token, res, next) {
	
	if( token ){

		try{
			const decoded = await jwt.verify(token, SecretKey);

			if( decoded.id && decoded.password){
				next();
			} else{
				res.redirect("/login")
			}

		} catch(err){
			res.redirect("/login")
		}

	} else{
		res.redirect("/login")
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

