/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (total, current) => {
    return total.likes > current.likes ? total : current
  }

  const blog = blogs.reduce(reducer, 0)

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  }
}

const mostBlogs = (blogs) => {
  const mostAuthorBlogs = _.max(_.entries(_.countBy(blogs, 'author', 'likes')))

  return (blogs = {
    author: mostAuthorBlogs[0],
    blogs: mostAuthorBlogs[1],
  })
}

const totalAuthorLikes = (blogs) => {
  const likesByAuthor = {}

  blogs.forEach((blog) => {
    const author = blog.author
    const likes = blog.likes

    if (likesByAuthor[author]) {
      likesByAuthor[author] += likes
    } else {
      likesByAuthor[author] = likes
    }
  })

  let maxLikesPerAuthor = null
  let maxLikes = 0

  for(const author in likesByAuthor) {
    if(likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author]
      maxLikesPerAuthor = author
    }
  }

  return blogs = {
    author: maxLikesPerAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  totalAuthorLikes,
}
