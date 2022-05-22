
const Mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/node-tuts";

const {port} = require("../config");

/*const host = "mywebsites.com";*/

const connectDb = async (listen) => {

		await Mongoose.connect(URI);

		listen(process.env.PORT || port, () => {
			console.log(`Server running on http://localhost:${port}`)
		});
} 

module.exports = { Mongoose, connectDb}