const express = require('express');
const environment = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const http = require('http');

if (process.env.NODE_ENV !== 'production') {
  const envFile = process.env.NODE_ENV ? `config/.env.${process.env.NODE_ENV}` : 'config/.env';
  environment.config({ path: path.resolve(__dirname, envFile) });
}

const logger = require('./config/winston');

// Models
require('./models/User');
require('./models/FriendConnect');
require('./models/GroupListeningRoom');

// Services
require('./services/passport');

logger.info('Application initializing.');
const app = express();

logger.info('Initializing DashrDB Connection');
const mongooseURI = `${process.env.DASHR_DB_URI_PREFIX + process.env.DASHR_DB_USERNAME}:${
  process.env.DASHR_DB_PASSWORD
}${process.env.DASHR_DB_URI_SUFFIX}`;

mongoose
  .connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('DB Connected');
  })
  .catch((err) => {
    logger.error(`DB NOT Connected. Error: ${err.message}`);
  });

// Applies smaller middleware functions that set HTTP res headers.
// https://helmetjs.github.io/docs/
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const secureCookies = process.env.NODE_ENV === 'production';
app.set('trust proxy', 1);
/* in the future we should have specified trusted proxies
app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // trusted IPs
  else return false
})
 */
logger.debug(`Using secure cookies: ${secureCookies}`);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day required login
    keys: [process.env.COOKIE_KEY],
    secure: secureCookies, // should always be true in production,
    httpOnly: true,
    expires: 60 * 60 * 1000, // 1 hour required active
  }),
);

const morganFormat = 'combined';
app.use(morgan(morganFormat, { stream: process.stdout }));

app.use(passport.initialize());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const musicRoutes = require('./routes/musicRoutes');

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/music', musicRoutes);

if (process.env.NODE_ENV === 'production') {
  logger.info('Production Environment -> serving client build static files');
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
} else {
  logger.debug('Development Environment -> manually spin up frontend build via:');
  logger.debug('$ cd client');
  logger.debug('$ npm start');
}

const PORT = process.env.PORT || 8090;

const server = http.createServer(app);
server.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
});

require('./services/socket')(server);

logger.verbose('Socket logic initialized');

module.exports = app;
