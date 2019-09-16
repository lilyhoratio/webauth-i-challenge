const express = require("express");
const cors = require("cors");
const userRouter = require("./users/user-router.js");

const server = express();

server.use(express.json());
server.use(cors());

// Sanity check
server.get(`/`, (req, res) => {
  res.status(200).json({ api: "I am up!" });
});

const bcrypt = require("bcryptjs");
const Users = require("./users/user-model.js");

server.post(`/api/register`, (req, res) => {
  // let credentials = req.body;
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  Users.insert({ username, password: hash }) // insert hash for password
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => res.status(500).json(err));
});

// ROUTES
server.use(`/api/user`, userRouter);

module.exports = server;
