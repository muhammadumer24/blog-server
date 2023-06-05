//------imports-----
const express = require("express")
const connect = require("./db/connect")
require("dotenv").config()
const routes = require("./routes/blog")
const cors = require("cors")
//<-------->
//starting app
const app = express()

//--------middlewares------------
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// <--------------->

//-----------routes------------
app.use("/", routes)
// <------------>

//---connecting and listening to database
const PORT = process.env.PORT || 2457
const start = async () => {
  try {
    await connect(process.env.MONGO_URI)
    app.listen(PORT, console.log(`App is listening on port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}
start()
