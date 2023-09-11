const { Grade, Section } = require('../db.js');

const gradeAssignment = async (yearId, grades, level) =>{

  for(let grade of grades){

    const newGrade = await Grade.create({
      level,
      grade: grade.gradeName
    });
 
    await newGrade.setYear(yearId);
    
    for(let section of grade.sections){

      const newSection = await Section.create({
        sectionName: section
      });

      await newSection.setGrade(newGrade.id);

    }

  }

}

const formatParentsData = (student, person) => {

  let data = {

    id: student.id,
    studentDNI: student.DNI,
    fatherLastName: student.fatherLastName,
    motherLastName: student.motherLastName,
    names: student.names,
    birthdate: student.birthdate,
    religion: student.religion,
    gender: student.gender,
    procedense: student.procedense,
    grade: student.grade,
    level: student.level

  }

  if(person == "father"){
    
    data = {

      ...data,
      fatherDNI: student.Representative.DNI,
      fatherName: student.Representative.names,
      fatherLastNames: student.Representative.lastNames,
      fatherAddress: student.Representative.address,
      fatherPhone: student.Representative.phone,
      fatherCivil: student.Representative.civilStatus,
      fatherCelPhone: student.Representative.celPhone,
      fatherEmail: student.Representative.email,
      fatherWorkPlace: student.Representative.workPlace,
      fatherOccup: student.Representative.ocuppation,
      fatherRPMorRPC: student.Representative.RPMorRPC

    }

    if(student.Parent) {

      data = {
        ...data,
        motherDNI: student.Parent.DNI,
        motherName: student.Parent.names,
        motherLastNames: student.Parent.lastNames,
        motherAddress: student.Parent.address,
        motherPhone: student.Parent.phone,
        motherCivil: student.Parent.civilStatus,
        motherCelPhone: student.Parent.celPhone,
        motherEmail: student.Parent.email,
        motherWorkPlace: student.Parent.workPlace,
        motherOccup: student.Parent.ocuppation,
        motherRPMorRPC: student.Parent.RPMorRPC
      }

    }

  }

  if(person == "mother"){
    
    data = {
      ...data,
      motherDNI: student.Representative.DNI,
      motherName: student.Representative.names,
      motherLastNames: student.Representative.lastNames,
      motherAddress: student.Representative.address,
      motherPhone: student.Representative.phone,
      motherCivil: student.Representative.civilStatus,
      motherCelPhone: student.Representative.celPhone,
      motherEmail: student.Representative.email,
      motherWorkPlace: student.Representative.workPlace,
      motherOccup: student.Representative.ocuppation,
      motherRPMorRPC: student.Representative.RPMorRPC

    }

    if(student.Parent) {
      
      data = {
        ...data,
        fatherDNI: student.Representative.DNI,
        fatherName: student.Representative.names,
        fatherLastNames: student.Representative.lastNames,
        fatherAddress: student.Representative.address,
        fatherPhone: student.Representative.phone,
        fatherCivil: student.Representative.civilStatus,
        fatherCelPhone: student.Representative.celPhone,
        fatherEmail: student.Representative.email,
        fatherWorkPlace: student.Representative.workPlace,
        fatherOccup: student.Representative.ocuppation,
        fatherRPMorRPC: student.Representative.RPMorRPC
      }

    }

  }

  return data

}

module.exports = {
  gradeAssignment,
  formatParentsData
}