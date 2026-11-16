const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => Book.find({}),
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async ({ name }) => Book.find({ author: name })
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
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author: author._id })
      await book.save()
      return book
    },
    editAuthor: () => null,
  },
}

module.exports = resolvers
