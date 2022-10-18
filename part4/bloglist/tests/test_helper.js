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

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willRemoveTitle',
    author: 'willRemoveAuthor',
    url: 'willRemoveUrl',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

module.exports = { initialBlogs, nonExistingId }