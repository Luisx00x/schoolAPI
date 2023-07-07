const { setUserName, setPassword } = require('./setUsersHandler');
const { User } = require('../db.js');

const createObject = async (Model, attributes) => {

    const newModel = await Model.create(attributes)

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