const forceDatabaseRefresh = false;

import session from 'express-session';
import dotenv from 'dotenv';
import SequelizeStore from 'connect-session-sequelize';
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
// import cors from 'cors';
dotenv.config();
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3004;
const SequelizeSessionStore = SequelizeStore(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET || 'secret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // alternative is using the expiration but docs prefer maxAge
    httpOnly: true, //not accessible to js e.g. document.cookie should not reveal it.
    secure: process.env.NODE_ENV === 'production', // Only require secure in production

    // sameSite:
    //   process.env.NODE_ENV === 'production'
    //     ? ('none' as const)
    //     : ('lax' as const),
    // domain:
    //   process.env.NODE_ENV === 'production'
    //     ? 'pet-adoption-server-qa7c.onrender.com'
    //     : 'localhost',
    // path: '/',
    // proxy: process.env.NODE_ENV === 'production' ? true : false,
    // partitioned: true, // Support for Chrome's CHIPS and Safari's partitioned cookies
  },
  resave: false,
  saveUninitialized: true,
  rolling: true, //resets the maxAge on every request
  store: new SequelizeSessionStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'https://pawsome-pets-adoption.netlify.app',
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//     exposedHeaders: ['set-cookie'],
//   }),
// );
// app.options('*', cors()); //preflight
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));

  // client-side routing
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
