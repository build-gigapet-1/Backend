  
const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("userId", "username", "password", "phone");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [userId] = await db("users").insert(user);
  return findById(userId);
}

function findById(userId) {
  return db("users")
    .where({ userId })
    .first();
}