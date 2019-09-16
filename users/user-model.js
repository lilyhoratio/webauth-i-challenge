const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  insert
};

function find() {
  return db("users").select("id", "username", "password");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => findById(id));
}
