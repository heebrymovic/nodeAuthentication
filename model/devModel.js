
const Mongoose = require("mongoose");

const DevSchema = new Mongoose.Schema({
	email:{
		type:String,
		required:true,
		unique:true
	},
	apiKey:{
		type:String,
		required:true
	},
	host:{
		type:String,
		required:true
	},
	usage:{
		type:Array,
		required:true
	}
});

exports.DevModel = Mongoose.model("apikey", DevSchema);


