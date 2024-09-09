// On utilise argon2i algorithme pour hasher nos mdp
const argon2 = require("argon2");

async function hash(plainPassword) {
  const hash = await argon2.hash(plainPassword);
  return hash;
}

async function compare(plainPassword, hashedPassword) {
  const isMatching = await argon2.verify(hashedPassword, plainPassword);
  return isMatching;
}

module.exports = { hash, compare }