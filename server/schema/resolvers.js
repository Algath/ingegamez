import Post from '../models/Post.js';
import User from '../models/User.js';
import { signToken, requireAdmin } from '../middleware/auth.js';

export const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find().sort({ createdAt: -1 });
    },

    post: async (_, { slug }) => {
      return await Post.findOne({ slug });
    },

    postsByCategory: async (_, { category }) => {
      return await Post.find({ category }).sort({ createdAt: -1 });
    },

    // Renvoie le username si le token est valide, utile pour vérifier une session
    me: (_, __, context) => {
      return context.user ? context.user.username : null;
    },
  },

  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('Identifiants invalides');

      const valid = await user.verifyPassword(password);
      if (!valid) throw new Error('Identifiants invalides');

      const token = signToken({ id: user._id, username: user.username, role: user.role });
      return { token, username: user.username };
    },

    createPost: async (_, args, context) => {
      requireAdmin(context);
      const post = new Post({ ...args, author: args.author ?? context.user.username });
      return await post.save();
    },

    updatePost: async (_, { id, ...fields }, context) => {
      requireAdmin(context);
      return await Post.findByIdAndUpdate(id, fields, { new: true });
    },

    deletePost: async (_, { id }, context) => {
      requireAdmin(context);
      const result = await Post.findByIdAndDelete(id);
      return result !== null;
    },
  },
};
