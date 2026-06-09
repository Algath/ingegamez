import Post from '../models/Post.js';
import User from '../models/User.js';
import Game from '../models/Game.js';
import Event from '../models/Event.js';
import { signToken, requireAdmin } from '../middleware/auth.js';
import { fetchGameByName } from '../services/bgg.js';
import GalleryImage from '../models/GalleryImage.js';
import { PostSchema, EventSchema, GalleryImageSchema } from './validation.js';

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

    me: async (_, __, context) => {
      if (!context.user) return null;
      return await User.findById(context.user.id).select('-password');
    },

    games: async () => await Game.find().sort({ name: 1 }),
    game: async (_, { bggId }) => await Game.findOne({ bggId }),
    events: async () => await Event.find().sort({ date: 1 }),
    galleryImages: async () => await GalleryImage.find().sort({ year: -1}),
  },

  Mutation: {
    register: async (_, { username, email, nom, prenom, password }, context) => {
      const emailNorm = email.toLowerCase();

      const existingEmail = await User.findOne({ email: emailNorm });
      if (existingEmail) throw new Error('Un compte avec cet email existe déjà');

      const existingUsername = await User.findOne({ username });
      if (existingUsername) throw new Error('Ce nom d\'utilisateur est déjà pris');

      const user = new User({ username, email: emailNorm, nom, prenom, password, role: 'member' });
      await user.save();

      const token = signToken({ id: user._id, username: user.username, role: user.role });
      context.res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 jours
      });
      return { username: user.username, role: user.role };
    },

    login: async (_, { username, password }, context) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('Identifiants invalides');

      const valid = await user.verifyPassword(password);
      if (!valid) throw new Error('Identifiants invalides');

      const token = signToken({ id: user._id, username: user.username, role: user.role });
      context.res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 jours
      });
      return { username: user.username, role: user.role };
    },
    
    logout: async (_, __, context) => {
      context.res.clearCookie('token');
      return true;
    },

    createPost: async (_, args, context) => {
      requireAdmin(context);
      const post = new Post({ ...args, author: args.author ?? context.user.username });
      PostSchema.validate(args);
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

    importGame: async (_, { name }, context) => {
      requireAdmin(context);
      const data = await fetchGameByName(name);
      return await Game.findOneAndUpdate(
        { bggId: data.bggId },
        { $set: data },
        { upsert: true, new: true }
      );
    },

    createEvent: async (_, args, context) => {
      requireAdmin(context);
      const event = new Event(args);
      EventSchema.validate(args);
      return await event.save();
    },
    
    deleteEvent: async (_, { id }, context) => {
      requireAdmin(context);
      const result = await Event.findByIdAndDelete(id);
      return result !== null;
    },

    createGalleryImage: async (_, args, context) => {
      requireAdmin(context);
      const image = new GalleryImage(args);
      GalleryImageSchema.validate(args);
      return await image.save();
    },

    deleteGalleryImage: async (_, { id }, context) => {
      requireAdmin(context);
      const result = await GalleryImage.findByIdAndDelete(id);
      return result !== null;
    },
  },
};
