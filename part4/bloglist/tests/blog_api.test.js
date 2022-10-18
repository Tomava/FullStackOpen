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

test('blogs can be added', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'Test4',
      author: 'Mauri Kunnari',
      url: 'DD',
      likes: 3141592
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)

  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'Test4'
  )
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})