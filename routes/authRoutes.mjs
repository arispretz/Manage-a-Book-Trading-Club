import express from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/userModel.mjs';
import { verifyToken, login, logout, getUser } from '../controllers/authController.mjs';
import authMiddleware from '../middleware/auth.mjs';
import axios from 'axios';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

router.get('/me', verifyToken, getUser);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://book-trading-club-backend.onrender.com/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = new User({
            name: profile.displayName,
            githubId: profile.id,
            email: profile.emails[0].value
          });
          await user.save();
        }
        user.accessToken = accessToken;
        await user.save();
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/user/repos', authMiddleware, async (req, res) => {
  const accessToken = req.user.accessToken;

  try {
    const response = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting repositories');
  }
});

export default router;
