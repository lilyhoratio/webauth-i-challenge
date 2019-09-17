const bcrypt = require("bcryptjs");
const Users = require("../users/user-model.js");

function restricted(req, res, next) {
  let { username, password } = req.headers; // credentials

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: `You shall not pass.` });
        }
      })
      .catch(err => res.status(500).json(err));
  } else {
    res.status(400).json({ message: "Username and password required" });
  }
}

module.exports = restricted;
