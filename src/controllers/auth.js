
const { User, Rol, Student, Teacher, Administration, Representative  } = require('../db.js');
const { representativeRegister } = require('../helpers/representativeHandler.js');
const { setUserName, setPassword } = require('../helpers/setUsersHandler.js');

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
      if(!representative) throw Error("Se debe seleccionar un apoderado");

      if(userRol === "student"){

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

        const newStudent = await Student.create({
          name,
          lastName,
          fatherName,
          motherName,
        });

        const userName = setUserName(name,lastName, newStudent.id);
        const password = await setPassword();
        
        const newUser = await User.create({
          userName,
          password
        });

        await newUser.setRol(2);
        
        await newStudent.setUser(newUser.id)

        if(!searchParent){

          const newRepresentative = representative === 1 ? 
          await representativeRegister(fatherName, fatherLastName, email, newStudent.id) : 
          await representativeRegister(motherName, motherLastName, email, newStudent.id);

        }else searchParent.setStudents(newStudent.id);

        return res.status(200).json("El usuario del alumno y su apoderado se han creado exitosamente");

      }

    }catch(err){
      //Falta manejar
      console.log(err);
      next();
    }

}

module.exports = {
  registerController
}