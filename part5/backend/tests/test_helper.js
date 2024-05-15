/* eslint-disable linebreak-style */
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Elomari s story',
    author: 'Aicha & Hamid',
    url: 'www.storyOfElomaris.com',
    likes: 100,
  },
  {
    title: 'Story of moad',
    author: 'Elomari s family',
    url: 'https://moadElo.com/',
    likes: 100,
  },
  {
    title: 'Story of selma',
    author: 'Elomari s family',
    url: 'https://selmaElo.com/',
    likes: 500,
  },
  {
    title: 'Story of amine',
    author: 'Elomari s family',
    url: 'http://amineElo.com',
    likes: 300,
  },
  {
    title: 'Story of anas',
    author: 'Elomari s family',
    url: 'http://anasElo.com',
    likes: 10000,
  }
]

const initialUsers = [
  {
    username: 'momo',
    name: 'momo',
    password: 'momonoske',
  }
]

const blogsInDb =  async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb
}