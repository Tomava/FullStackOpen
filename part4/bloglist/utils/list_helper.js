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

const mostLikes = (blogs) => {
  const authors = {}
  blogs.forEach((blog) => {
    authors[blog.author] = authors[blog.author] ? authors[blog.author] + blog.likes : blog.likes
  })
  const maxLikes = Math.max(...Object.values(authors))
  for (const [author, likes] of Object.entries(authors)) {
    if (likes === maxLikes) {
      return { 'author': author, 'likes': maxLikes }
    }
  }
  return { 'author': undefined, 'likes': undefined }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}