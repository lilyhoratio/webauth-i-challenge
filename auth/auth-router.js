const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/user-model.js");
const router = express.Router();

// REGISTER
router.post(`/register`, (req, res) => {
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  Users.insert({ username, password: hash }) // insert hash for password
    .then(user => {
      console.log(req.session); // old session info from last registered user
      req.session.user = user;
      console.log(req.session); // new session info - overwrites
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json(err));
});

// LOGIN
router.post(`/login`, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // cookie creaed automatically by library and is sent to client.
        // client holds onto cookie - all cookies related to domain will be sent
        req.session.user = user; // added this - nothing tied to cookie b/c in memory - server restarted
        console.log("LOGIN: ", req.session);
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: `You shall not pass.` });
      }
    })
    .catch(err => res.status(500).json(err));
});

// LOGOUT
router.get(`/logout`, (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({ message: "you can never leave!!!" });
      } else {
        res.status(200).json({ message: "bye" });
      }
    });
  } else {
    res.status(200).json({ message: "already logged out" });
  }
});

module.exports = router;
