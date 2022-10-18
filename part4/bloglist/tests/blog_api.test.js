const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test1',
    author: 'Mauri',
    url: 'AA',
    likes: 1000
  },
  {
    title: 'Test2',
    author: 'Mauri K.',
    url: 'BB',
    likes: 9
  },
  {
    title: 'Test3',
    author: 'Mauri Kun',
    url: 'CC',
    likes: 0
  },
]

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Test1'
  )
})

test('blogs have id field', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})