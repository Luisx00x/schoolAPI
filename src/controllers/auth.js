
const { User, Student, Teacher, Administration, Representative  } = require('../db.js');
const { representativeRegister } = require('../helpers/representativeHandler.js');
const { createObject, createUser } = require('../helpers/createUserHandler.js');
const { compare } = require('../helpers/bcryptHandler.js');

const registerController = async (req, res, next) => {

    const {
      name,
      lastName,  
      userRol,
      email,
      fatherName,
      fatherLastName,
      motherName,
      motherLastName,
      representative
    } = req.body;

    try{
      
      if(!name) throw Error("Debe ingresar un nombre");
      if(!lastName) throw Error("Debe ingresar un apellido");
      if(!email) throw Error("Se debe especificar un email");
      if(!userRol) throw Error("Se debe especificar el tipo de usuario");
      
      if(userRol === 2){

        if(!representative) throw Error("Se debe seleccionar un apoderado");
        
        const searchParent = await Representative.findOne({
          where: {
            email: email
          },
          include: [
            {
              model: Student
            }
          ]
        });

        if(searchParent) {

          const searchChild = await Student.findOne({
            where: {
              RepresentativeId: searchParent.id,
              name,
              lastName
            }
          })

          if(searchChild) return res.json({msg: "El alumno ya se encuentra registrado", searchParent}); 
          //aqui es la interrupcion
        
        }

        const newStudent = await createObject(Student, {name, lastName, fatherName, motherName});

        const newUser = await createUser(name, lastName, newStudent.id);

        await newUser.setRol(userRol);  
        await newStudent.setUser(newUser.id);

        if(!searchParent){

          const newRepresentative = representative === 1 ? 
          await representativeRegister(fatherName, fatherLastName, email, newStudent.id) : 
          await representativeRegister(motherName, motherLastName, email, newStudent.id);

        }else searchParent.setStudents(newStudent.id);

        return res.status(200).json("El usuario del alumno y su apoderado se han creado exitosamente");

      }else

      if(userRol === 3){

        const searchTeacher = await Teacher.findOne({
          where: {
            email: email
          }
        })

        if(searchTeacher){
          return res.status(200).json({msg: "El profesor ya existe en el sistema", searchTeacher});
        }
        
        else{

          const newTeacher = await createObject(Teacher, {name, lastName, email});

          const newUser = await createUser(name, lastName, newTeacher.id);

          await newUser.setRol(userRol);
          await newTeacher.setUser(newUser.id);

          return res.status(200).json("El usuario del profesor se ha creado correctamente!");

        }

      }else
      
      if(userRol === 1){

        const searchAdmin = await Administration.findOne({
          where: {
            email: email
          }
        });

        if(searchAdmin) return res.status(202).json({msg: "El administrador ya se encuentra registrado", searchAdmin});

        else {

          const newAdmin = await createObject(Administration, {name, lastName, email});

          const newUser = await createUser(name, lastName, newAdmin.id);

          await newUser.setRol(userRol);
          await newAdmin.setUser(newUser.id);

          return res.status(200).json("El aministrador fue registrado exitosamente!");

        }

      }

    }catch(err){
      //Falta manejar
      console.log(err);
      next();
    }

}

const loginController = async (req, res, next) => {

  const { userName, password } = req.body;

  if(!userName) return res.status(404).json("No ha ingresado un usuario");
  if(!password) return res.status(404).json("No ha ingresado una contraseña");

  try{

    const searchUser = await User.findOne({
      where: {
        userName: userName
      }
    })

    if(searchUser){

      const verify = await compare(password, searchUser.password);
  
      if(verify) return res.status(200).json(searchUser)
      else return res.status(404).json("Contraseña incorrecta");
    }

    return res.status(404).json("usuario no encontrado")

  }catch(err){
    console.error(err);
    next();
  }

}

module.exports = {
  registerController,
  loginController
}