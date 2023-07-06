const bycrypt = require('bcryptjs');

const encrypt = async (planePassword) => {
  const hash = await bycrypt.hash(planePassword, 10);
  return hash;
}

const compare = async (planePassword, hashPassword) => {
  return await bycrypt.compare(planePassword, hashPassword);
}

module.exports = {
  encrypt,
  compare
}