import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      published
      title
      author
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $genres: [String!]!
    $published: Int
  ) {
    addBook(title: $title, author: $author, genres: $genres, published: $published) {
      id
      published
      title
      author
      genres
    }
  }
`

export const EDIT_BORN = gql`
  mutation editBorn($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      bookCount
      born
      id
      name
    }
  }
`
