export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    date: String!
    category: String!
    author: String!
    image: String
    description: String!
    slug: String!
    createdAt: String
    updatedAt: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    nom: String!
    prenom: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    username: String!
    role: String!
  }

  type BoardGame {
    id: ID!
    bggId: String!
    name: String!
    yearPublished: Int
    description: String
    thumbnail: String
    image: String
    minPlayers: Int
    maxPlayers: Int
    playingTime: Int
    rating: Float
  }

  type Query {
    posts: [Post!]!
    post(slug: String!): Post
    postsByCategory(category: String!): [Post!]!
    me: User
    games: [BoardGame!]!
    game(bggId: String!): BoardGame
  }

  type Mutation {
    # Auth
    login(username: String!, password: String!): AuthPayload!
    register(
      username: String!
      email: String!
      nom: String!
      prenom: String!
      password: String!
    ): AuthPayload!

    # Posts — admin uniquement
    createPost(
      title: String!
      date: String!
      category: String!
      author: String
      image: String
      description: String!
      slug: String!
    ): Post!

    updatePost(
      id: ID!
      title: String
      date: String
      category: String
      author: String
      image: String
      description: String
      slug: String
    ): Post

    deletePost(id: ID!): Boolean!

    # BGG — admin uniquement
    importGame(name: String!): BoardGame!
  }
`;
