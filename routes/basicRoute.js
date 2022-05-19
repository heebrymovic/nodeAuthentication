
const express = require("express");

const basicRoute = express.Router();

const {homepage,login, register, logout} = require("../controller/basicController")

basicRoute.route("/").get(homepage);
basicRoute.route("/login").get(login)
basicRoute.route("/register").get(register);
basicRoute.route("/logout/:type").get(logout);


module.exports = { basicRoute }