const blog = require("../model/blog")

const add = async (req, res) => {
  try {
    if (!req.body.title || req.body.content === "<p><br></p>") {
      return res.status(400).send("Please provide details")
    }
    await blog.create(req.body)
    res.send("Document successfully created").status(201)
  } catch (err) {
    res.json({ msg: err.message }).status(400)
  }
}
const getData = async (req, res) => {
  try {
    const data = await blog.find({})
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send("something went wrong")
  }
}
const getSingleBlog = async (req, res) => {
  try {
    if (!req.params)
      return res.status(400).send("Params are missing or invalid link")
    let { title } = req.params
    title = title.replace(/-/g, " ")
    const data = await blog.findOne({ title })
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send("The link is broken!")
  }
}
module.exports = { add, getData, getSingleBlog }
