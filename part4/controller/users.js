/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  if (password.length < 3 && username.length < 3) {
    return response
      .status(400)
      .json({ error: 'username or password too short' })
  } else if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'username and password required' })
  }

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  response.status(200).json(users)
})

module.exports = usersRouter
