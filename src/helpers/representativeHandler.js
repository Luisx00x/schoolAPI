const { Parents, Representative } = require('../db.js');
const { createObject, createUser } = require('./createUserHandler.js');

const representativeRegister = async (DNI, names, lastNames, address, phone, civilStatus, celPhone, email, workPlace, ocuppation, RPMorRPC, isRepresentative, studentId) => {
 
  let newRepresentative;

  if(!isRepresentative){
    newRepresentative = await createObject(Parents, {names, DNI, lastNames, address, phone, civilStatus, celPhone, email, workPlace, ocuppation, RPMorRPC});
  }

  if(isRepresentative){
    newRepresentative = await createObject(Representative, {names, DNI, lastNames, address, phone, civilStatus, celPhone, email, workPlace, ocuppation, RPMorRPC});
    const representativeUser = await createUser(names, lastNames, newRepresentative.id);
    representativeUser.setRol(4);
    newRepresentative.setUser(representativeUser.id);
  }
  

  newRepresentative.addStudents(studentId);

  return newRepresentative

}


module.exports = {
  representativeRegister
}