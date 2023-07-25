
const { User, Student, Teacher, Administration, Representative  } = require('../db.js');
const { representativeRegister } = require('../helpers/representativeHandler.js');
const { createObject, createUser } = require('../helpers/createUserHandler.js');
const { compare } = require('../helpers/bcryptHandler.js');
const { Op } = require('sequelize');

const registerController = async (req, res, next) => {

    const {
      studentDNI,
      names,
      fatherLastName,
      motherLastName,
      birthdate,
      gender,
      level,
      grade,
      religion,
      procedense,
      userRol,
      fatherDNI,
      fatherLastNames,
      fatherName,
      fatherAddress,
      fatherPhone,
      fatherCivil,
      fatherCelphone,
      fatherEmail,
      fatherWorkPlace,
      fatherOccup,
      fatherRPMorRPC,
      motherDNI,  
      motherLastNames,
      motherName,
      motherAddress,
      motherPhone,
      motherCivil,
      motherCelPhone,
      motherEmail,
      motherWorkPlace,
      motherOccup,
      motherRPMorRPC,
      representative
    } = req.body;

    try{
      if(!names) return res.status(400).json("Debe ingresar un nombre para el alumno ");
      if(!birthdate) return res.status(400).json("Se debe ingresar una fecha de nacimiento del alumno");
      if(!gender) return res.status(400).json("Debe ingresar el genero del alumno");
      if(!level) return res.status(400).json("Debe seleccionar un nivel educativo");
      if(!grade) return res.status(400).json("Se debe seleccionar el grado del alumno");
      if(!religion) return res.status(400).json("Se debe especificar la religión del alumno");
      if(!representative) return res.status(400).json("Debe haber un apoderado responsable del alumno");
      if(!fatherEmail && !motherEmail) return res.status(400).json("Se debe especificar un email para el apoderado");
      if(!userRol) return res.status(400).json("Se debe especificar el tipo de usuario");
      if(fatherDNI && !fatherCivil) return res.status(400).json("El padre debe especificar su estado civil");
      if(fatherDNI && !fatherAddress) return res.status(400).json("El padre debe especificar una dirección");
      if(fatherDNI && !fatherEmail) return res.status(400).json("Se debe especificar un correo para el padre");
      if(motherDNI && !motherCivil) return res.status(400).json("La madre debe especificar su estado civil");
      if(motherDNI && !motherAddress) return res.status(400).json("La madre debe especificar una dirrección");
   
      //Alumno
      if(parseInt(userRol) === 2){


        if(!representative) return res.status(400).json("Se debe seleccionar un apoderado");
        
        let representativeSearch;

        if(fatherDNI){
          const searchParent = await Representative.findOne({
            where:{
              DNI: parseInt(fatherDNI)
            },
            include: [
              { model: Student }
            ]
          })
          if(searchParent) representativeSearch = searchParent;
        }
        if(motherDNI){
          const searchParent = await Representative.findOne({
            where:{
              DNI: parseInt(motherDNI)
            },
            include: [
              { model: Student }
            ]
          })
          if(searchParent) representativeSearch = searchParent;
        }

        //Busca a el alumno entre los alumnos relacionados con el apoderado
        if(representativeSearch) {

          const searchChild = await Student.findOne({
            where: {
              RepresentativeDNI: representativeSearch.DNI,
              names,
              fatherLastName,
              motherLastName
            }
          })

          if(searchChild) return res.status(200).json("El alumno ya se encuentra registrado"); 
          //aqui es la interrupcion
        
        }

        const newStudent = await createObject(Student, 
          {
            DNI: parseInt(studentDNI),
            names, 
            fatherLastName, 
            motherLastName,
            birthdate,
            gender,
            level,
            grade,
            religion,
            procedense
          });

        const newUser = await createUser(names, fatherLastName, newStudent.id);

        await newUser.setRol(userRol);  
        await newStudent.setUser(newUser.id);

        //Creación de los padres
        if(!representativeSearch){

          //(DNI, names, lastNames, address, phone, civilStatus, celPhone, email, workPlace, ocuppation, RPMorRPC, studentId)
          let isFatherRep = false, isMotherRep = false

          if(parseInt(representative) === 1) isFatherRep = true;
          if(parseInt(representative) === 2) isMotherRep = true;

          if(fatherDNI){
            await representativeRegister(parseInt(fatherDNI), fatherName, fatherLastNames, fatherAddress, fatherPhone, fatherCivil, fatherCelphone, fatherEmail, fatherWorkPlace, fatherOccup, fatherRPMorRPC, isFatherRep, newStudent.id); 
          }
          if(motherDNI){
            await representativeRegister(parseInt(motherDNI), motherName, motherLastNames, motherAddress, motherPhone, motherCivil, motherCelPhone, motherEmail, motherWorkPlace, motherOccup, motherRPMorRPC, isMotherRep, newStudent.id);
          }


        }else {
          representativeSearch.setStudents(newStudent.id);
        }

        return res.status(200).json("El usuario del alumno y su apoderado se han creado exitosamente");

      }else

      if(parseInt(userRol) === 3){

        const searchTeacher = await Teacher.findOne({
          where: {
            email: email
          }
        })

        if(searchTeacher){
          return res.status(200).json("El profesor ya existe en el sistema");
        }
        
        else{

          const newTeacher = await createObject(Teacher, {name, lastName, email});

          const newUser = await createUser(name, lastName, newTeacher.id);

          await newUser.setRol(userRol);
          await newTeacher.setUser(newUser.id);

          return res.status(200).json("El usuario del profesor se ha creado correctamente!");

        }

      }else
      
      if(parseInt(userRol) === 1){

        const searchAdmin = await Administration.findOne({
          where: {
            email: email
          }
        });

        if(searchAdmin) return res.status(202).json("El administrador ya se encuentra registrado");

        else {

          const newAdmin = await createObject(Administration, {name, lastName, email});

          const newUser = await createUser(name, lastName, newAdmin.id);

          await newUser.setRol(userRol);
          await newAdmin.setUser(newUser.id);

          return res.status(200).json("El aministrador fue registrado exitosamente!");

        }

      }else{
        
        return res.status(200).json("No se pudo procesar su solicitud")

      }

    }catch(err){
      res.status(404).json(err)
      console.log(err);
      next();
    }

}

const loginController = async (req, res, next) => {

  const { userName, password } = req.body;

  try{

    if(!userName) return res.status(404).json("No ha ingresado un usuario");
    if(!password) return res.status(404).json("No ha ingresado una contraseña");

    const searchUser = await User.findOne({
      where: {
        userName: userName
      }
    })

    if(searchUser){

      const verify = await compare(password, searchUser.password);
  
      if(verify){
        const response = {
          id: searchUser.id,
          userName: searchUser.userName,
          RolId: searchUser.RolId
        }
        return res.status(200).json(response);
      }
      else return res.status(404).json("Contraseña incorrecta");
    }

    return res.status(404).json("usuario no encontrado")

  }catch(err){
    res.status(404).json(err)
    console.log(err)
    next();
  }

}

module.exports = {
  registerController,
  loginController
}