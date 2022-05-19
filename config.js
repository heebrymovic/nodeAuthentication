
const dotenv = require("dotenv");

const {parsed:env} = dotenv.config();

const {SecretKey} = env;

module.exports = {SecretKey}
