const express = require("express");
const cors = require("cors");
const session = require("express-session");
// currying - function of several arguments that accepts
// first arg and returns a function that accepts the second argument
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("./data/dbConfig.js");

const sessionConfig = {
  name: "grumpycookie", // sid (session_id)
  secret: process.env.SESSION_SECRET || "secret", // needed for encryption - decrypt with "secret"
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false, // true means only send cookie over https, not http
    // secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true // true means JS has no access to the cookie
  },
  resave: false, // don't want to recreate a session even if it hasn't changed
  saveUninitialized: false, // GDPR compliance - laws against setting cookies automatically (user opts in => can be true)

  // persist sessions
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "knexsessions", // not camelCased -_-
    sidfieldname: "sessionid",
    createtable: true,
    clearInterval: 1000 * 60 * 30 // in ms - clean out all expired session data at every time interval (every 30 min) in the database
  })
};

const userRouter = require("./users/user-router.js");
const authRouter = require("./auth/auth-router.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// Sanity check
server.get(`/`, (req, res) => {
  res.status(200).json({ api: "I am up!" });
});

// ROUTES
server.use(`/api/users`, userRouter);
server.use(`/api/auth`, authRouter);

module.exports = server;
