const { add, getData, getSingleBlog } = require("../controller/blog")
const { login, userInfo } = require("../controller/user")
const authorize = require("../middlewares/authorize")
const authenticate = require("../middlewares/authenticate")
const express = require("express")
const router = express.Router()

router.post("/add", authorize, authenticate, add)
router.post("/login", authenticate, login)
router.get("/authorize", authorize, authenticate, userInfo)
router.get("/getData", getData)
router.get("/blog/:id", getSingleBlog)

module.exports = router
