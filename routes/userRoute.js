

const express = require("express");

const userRoute = express.Router();

const {userAuth} = require("../middleware/auth");

const {userIndex} = require("../controller/userController")

userRoute.route("/user/:id").get(userAuth, userIndex)


module.exports = {userRoute}