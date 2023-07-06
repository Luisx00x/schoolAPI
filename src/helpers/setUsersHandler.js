const { encrypt } = require('./bcryptHandler.js');

const setUserName = (name, lastName, id) => {
  
  const userName = name+lastName+id
  return userName

}

const setPassword = () => {

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@*"; //26 + 26 + 2
  let newPassword = "";

  for(let i = 0; i < 8; i++){
    const charSelect = Math.random()*53;
    newPassword += chars.charAt(Math.round(charSelect));
  }

  const encryptedPassword = encrypt(newPassword)

  return encryptedPassword;

}

module.exports = {
  setPassword,
  setUserName
}