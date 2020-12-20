require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
  }
`
const byGenre = (books, genre) => {
  return books.filter((book) => book.genres.includes(genre))
}
const byAuthor = (books, author) => {
  return books.filter((book) => book.author === author)
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let rbooks = books
      rbooks = !args.author ? rbooks : byAuthor(rbooks, args.author)
      rbooks = !args.genre ? rbooks : byGenre(rbooks, args.genre)
      return rbooks
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: (root) =>
      books.reduce(
        (sum, current) => (current.author === root.name ? sum + 1 : sum),
        0
      ),
  },
  Mutation: {
    addBook: (root, args) => {
        const book = {...args, id: uuid() }
        books = books.concat(book)
        if(!authors.some(a => a.name === args.author)){
           authors = authors.concat({
                name: args.author,
                id: uuid()
            })
        }
        return book
    },
    editAuthor: (root, args) => {
        const author = authors.find(p => p.name === args.name)
        if (!author) {
          return null
        }
    
        const updatedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
        return updatedAuthor
      }   
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
