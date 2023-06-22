const blog = require("../model/blog")

const add = async (req, res) => {
  try {
    if (!req.body.title || req.body.content === "<p><br></p>") {
      return res.status(400).send("Please provide details")
    }
    req.body.createdAt = Number(new Date())
    await blog.create(req.body)
    res.status(201).send("Document successfully created")
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: err.message })
  }
}
const getData = async (req, res) => {
  try {
    const data = await blog.find({}).sort({ createdAt: -1 })
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send("something went wrong")
  }
}
const getSingleBlog = async (req, res) => {
  try {
    if (!req.params)
      return res.status(400).send("Params are missing or invalid link")
    let { id } = req.params
    const data = await blog.findOne({ _id: id })
    let { views: view } = data
    res.status(200).json(data)
    await blog.findOneAndUpdate({ _id: id }, { views: ++view })
  } catch (err) {
    console.log(err)
    res.status(500).send("The link is broken!")
  }
}
module.exports = { add, getData, getSingleBlog }
