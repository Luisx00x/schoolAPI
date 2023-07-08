const { encrypt } = require('./bcryptHandler.js');

const setUserName = (name, lastName, id) => {

  let nick;
  let last;

  (name.length < 4) ? 
  nick = name : 
  nick = name.slice(0,4);
  
  (lastName < 4) ?
  last = lastName:
  last = lastName.slice(0,4);

  const userName = nick+last+id;
  
  return userName

}

//Cambiar nombres
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

const newPassword = (planePassword) => {

  const encryptedPassword = encrypt(planePassword);
  return encryptedPassword;

}

module.exports = {
  setPassword,
  setUserName,
  newPassword
}