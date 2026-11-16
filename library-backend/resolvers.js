const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) return Book.find({})
      return Book.find({ genres: args.genre })
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async ({ name }) => Book.find({ author: name }),
  },
  Book: {
    author: async (book) => Author.findById(book.author),
  },
  Mutation: {
    addBook: async (root, args) => {
      const titleExists = await Book.exists({ title: args.title })
      if (titleExists) {
        throw new GraphQLError(`Title already stored: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }
      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({ ...args, author: author._id })
        await book.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extension : {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      await author.save()
      return author
    },
  },
}

module.exports = resolvers
