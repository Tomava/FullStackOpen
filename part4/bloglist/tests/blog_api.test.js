const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'Test1'
    )
  })

  test('blogs have id field', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  describe('addition of a new blog', () => {
    test('blogs can be added', async () => {
      const blog = {
        title: 'Test4',
        author: 'Mauri Kunnari',
        url: 'DD',
        likes: 3141592
      }
      await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

      const titles = response.body.map(r => r.title)
      expect(titles).toContain(
        blog.title
      )

    })

    test('blogs with no likes field will have them set to 0', async () => {
      const blog = {
        title: 'Test4',
        author: 'Mauri Kunnari',
        url: 'DD'
      }
      await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

      const titles = response.body.map(r => r.title)
      expect(titles).toContain(
        blog.title
      )
      response.body.forEach(blog => {
        expect(blog.likes).toBeDefined()
      })
    })

    test('invalid blogs are not added', async () => {
      const templateBlog = {
        author: 'Mauri Kunnari',
        likes: 3141592
      }

      const blogWithoutUrl = { ...templateBlog, title: 'Test4' }

      await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)

      const blogWithoutTitle = { ...templateBlog, url: 'DD' }

      await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
  })
  describe('deletion of a blog', () => {
    test('blogs can be deleted', async () => {
      const initialResponse = await api.get('/api/blogs')
      const deleteId = initialResponse.body[0].id

      await api
        .delete(`/api/blogs/${deleteId}`)
        .expect(204)

      const newResponse = await api.get('/api/blogs')
      expect(newResponse.body).toHaveLength(helper.initialBlogs.length - 1)

      const titles = newResponse.body.map(r => r.title)

      expect(titles).not.toContain(
        initialResponse.body[0].title
      )
    })
    test('unknown id does not delete anything', async () => {
      const deleteId = await helper.nonExistingId()

      await api
        .delete(`/api/blogs/${deleteId}`)
        .expect(204)

      const newResponse = await api.get('/api/blogs')
      expect(newResponse.body).toHaveLength(helper.initialBlogs.length)

    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})