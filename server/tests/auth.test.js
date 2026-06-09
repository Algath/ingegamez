import { signToken, getUserFromToken, requireAdmin } from '../middleware/auth.js';

describe('JWT — signToken / getUserFromToken', () => {
    test('un token signé puis décodé restitue le payload', () => {
      const token = signToken({ id: '1', username: 'bob', role: 'admin' });
      const user = getUserFromToken(token);
      expect(user.username).toBe('bob');
      expect(user.role).toBe('admin');
    });

    test('un token invalide renvoie null', () => {
      expect(getUserFromToken('nimportequoi')).toBeNull();
    });
  });

describe('requireAdmin', () => {
    test('laisse passer un admin', () => {
        expect(() => requireAdmin({ user: { role: 'admin' }
        })).not.toThrow();
    });

    test('rejette un non-admin', () => {
        expect(() => requireAdmin({ user: { role: 'member' }
        })).toThrow();
    });
});