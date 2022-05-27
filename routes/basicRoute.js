
const express = require("express");

const basicRoute = express.Router();

const {homepage,login, register, logout, error} = require("../controller/basicController")

basicRoute.route("/").get(homepage);
basicRoute.route("/login").get(login)
basicRoute.route("/register").get(register);
basicRoute.route("/logout/:type").get(logout);

basicRoute.use(error)

module.exports = { basicRoute }