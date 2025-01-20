import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
// import { Op } from "sequelize";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      // where: {
      //   [Op.or]: [{ email }, { username }],
      // },
      where: {
        email: email,
      },
    });
    // FIXME can't have these codes as 401 due to axios interceptor
    if (!user) {
      return res.status(400).json({ message: 'Authentication failed' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).json({ message: 'Authentication failed' });
    }

    req.session.save((err: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      req.session.logged_in = true;
      req.session.user_id = user.id;
      req.session.username = user.username;

      console.log('Session after login:', req.session);
      console.log('Cookies:', req.headers.cookie);
      return res.json({
        username: user.username,
        email: user.email,
        id: user.id,
      });
    });
    return;
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;
      console.log(req.session);

      res.status(200).json(user);
    });
  } catch (err: any) {
    res.status(400).json(err.message);
  }
};

const logout = async (req: Request, res: Response) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
// POST /register - Register a new user
router.post('/register', register);
// POST /logout - Logout a user
router.post('/logout', logout);

export default router;
