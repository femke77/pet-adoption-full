import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    logged_in: boolean;
    user_id: number;
    username: string;
  }
}

const apiGuard = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.logged_in) {
    res.status(401).json({ msg: 'You must login to perform this action' });
  } else {
    next();
  }
};

export { apiGuard };
