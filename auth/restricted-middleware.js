// const express = require("express");
// const bcrypt = require("bcryptjs");
// const Users = require("../users/user-model.js");

function restricted(req, res, next) {
  console.log("SESSION: ", req.session);

  // check if we have a session, and inside of that session, there is a user property
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "not authorized!" });
  }

  // no need to search for anything in the DB
  // let { username, password } = req.headers; // credentials
  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: `You shall not pass.` });
  //       }
  //     })
  //     .catch(err => res.status(500).json(err));
  // } else {
  //   res.status(400).json({ message: "Username and password required" });
  // }
}

module.exports = restricted;
