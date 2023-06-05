const userModel = require("../model/user")
const bcrypt = require("bcrypt")
require("dotenv").config()

const authenticate = async (req, res, next) => {
  try {
    if (!((req.body.userName && req.body.password) || req.headers.userInfo)) {
      return res.status(401).send("Please proveide your credentials")
    }
    const data = {
      userName: req.body.userName || req.headers.userInfo.userName,
      password: req.body.password || req.headers.userInfo.password,
    }
    const user = await userModel.findOne({ userName: data.userName })
    if (!user) {
      return res
        .status(400)
        .send(`No User was found with user name ${data.userName}`)
    }
    const result = await bcrypt.compare(data.password, user.password)
    const passwordMatched =
      result || data.password === user.password ? true : false
    if (!passwordMatched) {
      return res.status(401).send("Incorrect Password")
    }
    req.headers.userInfo = user.toObject()
    next()
  } catch (err) {
    console.log(err)
    res.status(500).send("Something went wrong in the server")
  }
}

module.exports = authenticate
