const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

// connect to MongoDB

const authors = [
  { name: "Robert Martin", born: 1952 },
  { name: "Martin Fowler", born: 1963 },
  { name: "Fyodor Dostoevsky", born: 1821 },
  { name: "Joshua Kerievsky" },
  { name: "Sandi Metz" },
]

const books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"],
  }
]

const main = async () => {
  
  require('dotenv').config()

  await mongoose.connect(process.env.MONGODB_URI)

  await Author.deleteMany({})
  await Book.deleteMany({})

  const savedAuthors = {}

  for (const a of authors) {
    const author = new Author(a)
    await author.save()
    savedAuthors[a.name] = author
  }

  for (const b of books) {
    const book = new Book({
      title: b.title,
      published: b.published,
      genres: b.genres,
      author: savedAuthors[b.author]._id
    })

    await book.save()
  }

  mongoose.connection.close()
}

main()