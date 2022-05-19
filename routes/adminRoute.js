
const express = require("express");

const adminRoute = express.Router();

const {adminAuth} = require("../middleware/auth");

const {adminIndex, listUsers} = require("../controller/adminController");

adminRoute.route("/admin/users").get(adminAuth, listUsers);

adminRoute.route("/admin/:id").get(adminAuth, adminIndex)

module.exports = { adminRoute }