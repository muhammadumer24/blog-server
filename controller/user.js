const jwt = require("jsonwebtoken")
require("dotenv").config()

const login = async (req, res) => {
  try {
    const token = jwt.sign(req.headers.userInfo, process.env.secret)
    res.status(200).json(token)
  } catch (err) {
    res.status(500).send("Something went wrong please try again later!")
  }
}
const userInfo = (req, res) => {
  res.status(200).send(req.headers.userInfo)
}

module.exports = { login, userInfo }
