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

  type AuthPayload {
    token: String!
    username: String!
  }

  type Query {
    posts: [Post!]!
    post(slug: String!): Post
    postsByCategory(category: String!): [Post!]!
    me: String
  }

  type Mutation {
    # Auth
    login(username: String!, password: String!): AuthPayload!

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
  }
`;
