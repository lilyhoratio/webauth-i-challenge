const express = require("express");
const Users = require("./user-model.js");

const router = express.Router();

router.get(`/`, (req, res) => {
  Users.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error retreiving users" });
    });
});

module.exports = router;
