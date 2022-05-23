
const Mongoose = require("mongoose");


const URI = "mongodb+srv://heebrymovic:test1234@node-tuts.cvraf.mongodb.net/node-tuts?retryWrites=true&w=majority";

/*"mongodb://localhost:27017/node-tuts";*/

const {port} = require("../config");

const connectDb = async (listen) => {

		await Mongoose.connect(URI);

		listen(process.env.PORT || port, () => {
			console.log(`Server running on http://localhost:${port}`)
		});
} 

module.exports = { Mongoose, connectDb}