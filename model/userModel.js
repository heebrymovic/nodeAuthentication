
const {Mongoose} = require("./db");

const UserSchema = new Mongoose.Schema({
	username:{
		type:String,
		unique:true,
		required:true
	},
	password:{
		type:String,
		minlength:6,
		required:true
	},
	role:{
		type:String,
		default:"basic",
		required:true
	},
	picture:{
		type:String,
		required:true
	}

}, {timestamps:true});

const UserModel = Mongoose.model("user-auth", UserSchema);

module.exports = { UserModel } 