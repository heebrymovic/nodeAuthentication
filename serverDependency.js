
const {connectDb} = require("./model/db");

const {authRoute} = require("./routes/authRoute");

const {basicRoute} = require("./routes/basicRoute");

const {adminRoute} = require("./routes/adminRoute");

const {userRoute} = require("./routes/userRoute");

const {error} = require("./controller/basicController");

const cookieParser = require("cookie-parser");

module.exports = { 
	connectDb,
	authRoute,
	basicRoute,
	adminRoute,
	userRoute,
	error,
	cookieParser
}