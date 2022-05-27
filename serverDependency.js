const express =  require("express");

const app = express();

const {connectDb} = require("./model/db");

const {authRoute} = require("./routes/authRoute");

const {basicRoute} = require("./routes/basicRoute");

const {adminRoute} = require("./routes/adminRoute");

const {userRoute} = require("./routes/userRoute");

const {devRoute} = require("./routes/devRoute");

const cookieParser = require("cookie-parser");

const nocache = require('nocache');

module.exports = { 
	express,app,
	connectDb,authRoute,
	basicRoute,	adminRoute,
	userRoute,cookieParser, 
	devRoute, nocache
}