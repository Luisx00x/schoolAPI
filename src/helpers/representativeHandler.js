const { Representative, User } = require('../db.js');
const { setPassword, setUserName } = require('./setUsersHandler.js');

const representativeRegister = async (name, lastName, email, studentId) => {
 
  const newRepresentative = await Representative.create({
    name,
    lastName,
    email
  });

  const password = await setPassword();
  const userName = setUserName(name, lastName, newRepresentative.id)

  const representativeUser = await User.create({
    userName,
    password
  }) 

  representativeUser.setRol(4);
  newRepresentative.setUser(representativeUser.id);
  newRepresentative.setStudents(studentId);

  return newRepresentative

}


module.exports = {
  representativeRegister
}