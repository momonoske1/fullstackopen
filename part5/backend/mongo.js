/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://momoelo1:${password}@cluster0.yaowcxp.mongodb.net/blogApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'Mongoose makes things easy',
  author: 'Ciccio benza',
  url: 'ciccio44.it',
  likes: 289
})



blog.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
