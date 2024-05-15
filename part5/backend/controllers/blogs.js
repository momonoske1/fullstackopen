/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require ('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  if (request.params.id.length !== 24) {
    return response.status(400).json({ error: 'invalid id' }).end()
  }

  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    password: 1,
  })
  blog ? response.json(blog) : response.status(404).end()
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body


  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  })

  if (!(blog.title && blog.author && blog.url)) {
    return response.status(400).json({ error: 'missing title, author or url' }).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )

  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findByIdAndRemove(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await blog.deleteOne()
    response.status(204).end()
  } else {
    return response.status(404).json({ error: 'blog not deleted' })
  }
})

module.exports = blogsRouter
