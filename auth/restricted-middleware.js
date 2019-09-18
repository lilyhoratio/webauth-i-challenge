function restricted(req, res, next) {
  // console.log("SESSION: ", req.session);
  // first, check if we have a session. then, check if there is a user inside that session
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "not authorized!" });
  }
}

// // Without sessions - checking the DB from user info sent in headers
// function restricted(req, res, next) {
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
// }

module.exports = restricted;
