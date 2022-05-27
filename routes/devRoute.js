
const express = require("express");

const devRoute = express.Router();

const { devRegister, devViewRender, devTestApi, devGetUsers } = require("../controller/devController");

const {register} = require("../controller/authController");

const {devApiAuth} = require("../middleware/devAuth");

const multer =  require("multer");

const upload = multer({dest:"./public/assets/uploads/"})

devRoute.post("/developers", devRegister)

devRoute.get("/developers", devViewRender)

devRoute.get("/dev/api", devTestApi);

devRoute.get("/v1/api/users",devApiAuth, devGetUsers);

devRoute.post("/v1/api/users",devApiAuth,upload.single("photo"), register);

module.exports = { devRoute }