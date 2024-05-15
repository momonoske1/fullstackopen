/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('blogs tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })

  test('api test', async () => {
    const notesAtStart = await helper.blogsInDb()

    await api
      .get('/api/blogs')
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(notesAtStart).toBeDefined()
  })

  test('returned blogs with id', async () => {
    const response = await api.get('/api/blogs')

    const idContainer = response.body[0].id
    expect(idContainer).toBeDefined()
  }, 100000)
})

describe('valid post requests', () => {
  let token
  beforeEach(async () => {
    await api.post('/api/users').send(helper.initialUsers[0])

    const response = await api.post('/api/login').send(helper.initialUsers[0])

    token = response.body.token
  })

  test('posting a new blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    console.log(blogsAtStart)
    const newBlog = {
      title: 'Mongoose makes things easy',
      author: 'Ciccio benza',
      url: 'ciccio44.it',
      likes: 289,
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await savedBlog.body
    expect(result.title).toBeDefined()
    const resultAtEnd = await helper.blogsInDb()
    console.log(resultAtEnd)
    expect(resultAtEnd).toHaveLength(blogsAtStart.length + 1)
  }, 100000)

  test('likes test', async () => {
    const resultAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Backend is no joke',
      author: 'Momonoske',
      url: 'BIS.it',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const resultAtEnd = await api.get('/api/blogs')
    expect(resultAtEnd.body).toHaveLength(resultAtStart.length + 1)
    console.log(resultAtEnd.body[2].likes)
  }, 100000)
})

describe('incorrect post requests', () => {
  let token
  beforeEach(async () => {
    await api.post('/api/users').send(helper.initialUsers[0])

    const response = await api.post('/api/login').send(helper.initialUsers[0])

    token = response.body.token
  })

  test('title missing test', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      author: 'ciccio benza',
      url: 'benza way',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(blogsAtStart.length)
  }, 100000)

  test('url missing test', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'empty benza',
      author: 'benzo benza',
      likes: 30,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(blogsAtStart.length)
  }, 100000)
})

describe('a blog can be deleted', () => {
  let token
  beforeEach(async () => {
    await api.post('/api/users').send(helper.initialUsers[0])

    const response = await api.post('/api/login').send(helper.initialUsers[0])

    token = response.body.token
  })

  test('a blog can be deleted', async () => {
    const newBlog = {
      title: 'test',
      author: 'unknown',
      url: 'https:www.unknown.com',
      likes: 3,
    }

    const newBlogPost = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    console.log(blogsAfterPost.length)

    const response = newBlogPost.body
    await api
      .delete(`/api/blogs/${response.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    console.log(blogsAfterDelete.length)

    expect(blogsAfterDelete.length).toStrictEqual(blogsAfterPost.length - 1)

    const blogs = blogsAfterDelete.map((b) => b.id)
    expect(blogs).not.toContain(response.id)
  })

  test('statuscode 401 when trying to delete blog', async () => {
    const blogsPriorPost = await helper.blogsInDb()

    const newBlog = {
      title: 'test2',
      author: 'unknown2',
      url: 'https:www.unknown2.com',
      likes: 10,
    }

    const newBlogPost = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost.length).toStrictEqual(blogsPriorPost.length + 1)

    const response = newBlogPost.body
    await api
      .delete(`/api/blogs/${response.id}`)
      .set('Authorization', 'Bearer 123456789105')
      .expect(401)

    const blogs = (await helper.blogsInDb()).map(blog => blog.id)
    console.log(blogs)
    expect(blogs).toContain(response.id)
  })

})

describe('a blog can be updated', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1].id

    const newLikes = {
      likes: 22,
    }

    await api.put(`/api/blogs/${blogToUpdate}`).send(newLikes).expect(200)

    const result = await helper.blogsInDb()

    expect(result[1].likes).toEqual(22)
  })
})

/*USERS TESTING*/

describe('creation of user', () => {
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('momonoske', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('user creation succeeds', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'momonoske',
      name: 'momo',
      password: 'momonoske',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toStrictEqual(usersAtStart.length + 1)

    const username = usersAtEnd.map((user) => user.username)
    expect(username).toContain(newUser.username)
  })

  test('user creation fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mo',
      name: 'momo',
      password: 'mo',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toStrictEqual(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
