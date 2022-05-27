
const Mongoose = require("mongoose");

const {port,URI} = require("../config");

const connectDb = async (listen) => {

		await Mongoose.connect(URI);

		listen(process.env.PORT || port, () => {
			console.log(`Server running on http://localhost:${port}`)
		});
} 

module.exports = { Mongoose, connectDb}