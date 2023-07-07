const { Representative, User } = require('../db.js');
const { createObject, createUser } = require('./createUserHandler.js');

const representativeRegister = async (name, lastName, email, studentId) => {
 
  const newRepresentative = await createObject(Representative, {name, lastName, email});

  const representativeUser = await createUser(name, lastName, newRepresentative.id);

  representativeUser.setRol(4);
  newRepresentative.setUser(representativeUser.id);
  newRepresentative.setStudents(studentId);

  return newRepresentative

}


module.exports = {
  representativeRegister
}