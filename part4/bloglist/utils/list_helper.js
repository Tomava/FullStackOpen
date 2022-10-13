const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current
  })
}

const mostBlogs = (blogs) => {
  const authors = {}
  blogs.forEach((blog) => {
    authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1
  })
  const maxBlogs = Math.max(...Object.values(authors))
  for (const [author, blogs] of Object.entries(authors)) {
    if (blogs === maxBlogs) {
      return { 'author': author, 'blogs': maxBlogs }
    }
  }
  return { 'author': undefined, 'blogs': undefined }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}