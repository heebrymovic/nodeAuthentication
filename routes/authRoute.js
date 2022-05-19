
const express = require("express");

const authRoute = express.Router();

const { register, login, update, deleteUser} = require("../controller/authController");

const multer = require("multer");

const {adminAuth} = require("../middleware/auth");

const upload = multer({dest:"./public/assets/uploads/"})

authRoute.route("/register").post(upload.single("photo"), register);

authRoute.route("/login").post(login);

authRoute.route("/update").put(adminAuth, update);

authRoute.route("/delete").delete(adminAuth, deleteUser);

module.exports = {authRoute}