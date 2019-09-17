const express = require("express");
const cors = require("cors");
const userRouter = require("./users/user-router.js");
const authRouter = require("./auth/auth-router.js");

const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session); // gotcha! currying?
const dbConnection = require("./data/dbConfig.js");

const server = express();

const sessionConfig = {
  name: "grumpycookie",
  secret: process.env.SESSION_SECRET || "secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false, // true means only send cookie over https
    httpOnly: true // true means JS has no access to the cookie
  },
  resave: false,
  saveUnitialized: false, // GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "knexsessions", // not camelCased -_-
    sidfieldname: "sessionid",
    createtable: true,
    clearInterval: 1000 * 60 * 30 // in ms - clean out all expired session data at every time interval (every 30 min)
  })
};

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// Sanity check
server.get(`/`, (req, res) => {
  res.status(200).json({ api: "I am up!" });
});

// ROUTES
server.use(`/api/users`, userRouter);
server.use(`/api`, authRouter);

module.exports = server;
