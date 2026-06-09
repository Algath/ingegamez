import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

const cookieExtractor = (req) => req?.cookies?.token || null;
const tokenExtractor = ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
]);

passport.use(new JwtStrategy(
    {
        jwtFromRequest: tokenExtractor,
        secretOrKey: JWT_SECRET,
    },
    (payload, done) => done(null, payload),
));

export default passport;