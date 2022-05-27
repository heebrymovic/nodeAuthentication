
const dotenv = require("dotenv");

const {parsed:env} = dotenv.config();

const {SecretKey,port, URI,maxApiPerDay} = env;

module.exports = {SecretKey,port, URI, maxApiPerDay}
