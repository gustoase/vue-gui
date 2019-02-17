import http from 'http'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import SocketIO from 'socket.io'

import config from './config'

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

const host = process.env.HOST || config.default_host;
const port = process.env.PORT || config.default_port;
app.set('port', port);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

// Set up DB
mongoose.connect(config.db, function (err) {
  if (err) throw err;
  console.log('Successfully connected mongo');
});

// Listen the server
server.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

require('./io')(io);
