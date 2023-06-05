const jwt = require("jsonwebtoken")
require("dotenv").config()

const check = async (req, res, next) => {
  try {
    //----checking the token
    let token = req.headers.authorization
    if (!token) {
      return res.status(401).send("No token was found")
    }
    if (!token.startsWith("Bearer ")) {
      return res.status(400).send("Invalid token format")
    }
    token = token.replace("Bearer ", "")
    const userInfo = jwt.verify(token, process.env.secret)
    //---token is verifed
    req.headers.userInfo = userInfo
    next()
  } catch (err) {
    console.log(err)
    res.status(400).send("Token Error")
  }
}
module.exports = check
