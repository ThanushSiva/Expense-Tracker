const express = require("express")
const { home } = require("../controller/home")
const { signUp } = require("../controller/signUp")
const { logIn } = require("../controller/logIn")
const { logOut } = require("../controller/logOut")
const router = express.Router()

router.get("/", home)
router.post("/auth/signup", signUp)
router.post("/auth/login", logIn)
router.get("/auth/logout", logOut)

module.exports = router