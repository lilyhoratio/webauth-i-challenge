const bcrypt = require("bcryptjs");
const Users = require("../users/user-model.js");

// REGISTER
server.post(`/register`, (req, res) => {
  // let credentials = req.body;
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  Users.insert({ username, password: hash }) // insert hash for password
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => res.status(500).json(err));
});

// LOGIN
server.post(`/login`, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: `You shall not pass.` });
      }
    })
    .catch(err => res.status(500).json(err));
});
