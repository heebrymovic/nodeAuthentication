
const {DevModel} = require("../model/devModel");

const {verifyHash} = require("../extras");

const {maxApiPerDay} =  require("../config");

exports.devApiAuth = async (req, res, next) => {
		const apiKey = req.query.apiKey;

		if(apiKey){

			try{

				let users = await DevModel.find();

				let findApi = false;

				let user = null;

				/*Loop through users and verify hashed apiKey */
				for( i = 0; i< users.length; i++ ){

					let verify = await verifyHash(apiKey, users[i].apiKey);

					if( verify ){
						findApi = true;
						user = users[i];
						break;	
					}
				}
					
				/*If API IS AVAILABLE*/
				if(findApi){

					console.log( user.email )
					let lastUsage = user.usage[user.usage.length - 1];
					
					let usageDate  = lastUsage.date

					let count = lastUsage.count

					let today = Date.now();

					let diff  = (today - usageDate) / (1000* 60 * 60 * 24) | 0;	

					/*Checks if current time is lesser than a day and maximum api count never exceeded*/

					if( (diff < 1) && (count < maxApiPerDay) ){

						lastUsage.count = count + 1;

						user.usage.splice(user.usage.length - 1, 1, lastUsage);

						await user.save();

						next()

					}else if(diff >= 1){
						/*If current day is beyound a day and more*/

						if( user.usage.length == 5 ){
							user.usage.shift();
						}
						
						if(user.usage.length < 5){
							user.usage.push({date:Date.now(), count : 1});
							user.save()
						}

						next()
					}else{
						res.status(400).json({message:`Maximum Api Limit of ${maxApiPerDay} Exceeded`})
					}

				}else{
					res.status(400).json({message:"Invalid Api Key"})
				}

			}catch(err){
				res.status(401).json({message:"An Error Occurred", error:err.message});
			}



		} else{
			res.status(401).json({message:"No Api Key Available.Kindly Provide Your Api Key"});
		}
}