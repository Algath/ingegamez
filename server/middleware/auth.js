import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function getUserFromToken(token) {
  if (!token) return null;

  try {
    const clean = token.replace('Bearer ', '');
    return jwt.verify(clean, JWT_SECRET);
  } catch {
    return null;
  }
}

export function requireAdmin(context) {
  if (!context.user || context.user.role !== 'admin') {
    throw new Error('Non autorisé : accès admin requis');
  }
}
