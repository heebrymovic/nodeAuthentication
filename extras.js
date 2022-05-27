
const bcryptjs = require("bcryptjs");

exports.generateApiKey = () => {

	return [...Array(50)].map(_ => Math.floor(Math.random() * 36 ).toString(36) ).join("");
} 

exports.hash = async (key) => {

	try{

		const hash = await bcryptjs.hash(key, 10)
		return await hash;	
		
	}catch( err){
		console.error(err.message )
	}

	
} 


exports.verifyHash = async (key, compareValue) =>{

	try{

		return  await bcryptjs.compare(key, compareValue);

	}catch(err){
		console.log( err.message )
	}

} 