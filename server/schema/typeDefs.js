export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    date: String!
    category: String!
    author: String!
    image: String
    description: String!
    content: String
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

  type Event {
    id: ID!
    title: String!
    logo: String
    date: String!
    description: String
    location: String
    createdAt: String
    updatedAt: String  
  }

  type GalleryImage {
    id: ID!
    url: String!
    alt: String
    year: Int!
    category: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post!]!
    post(slug: String!): Post
    postsByCategory(category: String!): [Post!]!
    me: User
    games: [BoardGame!]!
    game(bggId: String!): BoardGame
    events: [Event!]!
    galleryImages: [GalleryImage!]!
  }

  type Mutation {
    # Auth
    login(username: String!, password: String!): AuthPayload!
    logout: Boolean!
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
      content: String
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
      content: String
      slug: String
    ): Post

    deletePost(id: ID!): Boolean!

    # BGG — admin uniquement
    importGame(name: String!): BoardGame!

    createEvent(
      title: String!
      date: String!
      description: String
      location: String
      logo: String
    ): Event!

    deleteEvent(id: ID!): Boolean!

    createGalleryImage(
      url: String!
      alt: String
      year: Int!
      category: String!
    ): GalleryImage!

    deleteGalleryImage(id: ID!): Boolean!
  }
`;
