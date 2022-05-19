
const Mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/node-tuts";

const connectDb = async (listen) => {

		await Mongoose.connect(URI);

		listen(2500, () => {
			console.log(`Server running on http://localhost:${2500}`)
		});
} 

module.exports = { Mongoose, connectDb}