const { setUserName, setPassword } = require('./setUsersHandler');
const { User } = require('../db.js');

const createObject = async (Model, attributes) => {

  const {name, lastName, motherName, motherLastName, fatherName, fatherLastName, email } = attributes;

    const newModel = await Model.create({
      name,
      lastName,
      motherName,
      motherLastName,
      fatherName,
      fatherLastName,
      email
    })

    return newModel;

}

const createUser = async (name, lastName, assosiationId) => {

  const userName = setUserName(name, lastName, assosiationId);
  const password = await setPassword();

  const newUser = await User.create({
    userName,
    password
  })
  
  return newUser;

}

module.exports = {
  createObject,
  createUser
}