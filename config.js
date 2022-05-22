
const dotenv = require("dotenv");

const {parsed:env} = dotenv.config();

const {SecretKey,port} = env;

module.exports = {SecretKey,port}
