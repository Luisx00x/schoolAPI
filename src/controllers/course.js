const { Course, Section, Teacher, Grade, Student } = require('../db.js');

const createCourse = async (req, res, next) => {

  const { courseName, init, end, teacherId, sectionId, sectionName} = req.body;

  try{

    if(!courseName) return res.status(400).json("No ha ingresado un nombre para el curso");
    if(!init) return res.status(400).json("No ha seleccionado una hora de inicio para el curso");
    if(!end) return res.status(400).json("No se ha seleccionado una una de finalización para el curso");
    if(!teacherId) return res.status(400).json("No se ha especificado un profesor");
    if(!sectionId) return res.status(400).json("No se ha especificado una sección");

    const searchCourse = await Course.findOne({
      where: {
        courseName
      },
      include: [
        {
          model: Section
        }
      ]
    });
  
    //Revisar si sectionName es necesario obligatoriamente
    const searchSection = await Section.findOne({
      where:{
        id: sectionId,
        sectionName
      }
    })

    //if(searchCourse && searchSection) return res.status(200).json({msg: "El curso ingresado ya existe", searchSection});

    //Creacion de curso
    const createCourse = await Course.create({
      courseName,
      init,
      end
    });

    // Se busca al profesor ingresado
    const validateTeacher = await Teacher.findByPk(teacherId)
    //Se agrega el profesor
    createCourse.addTeachers(validateTeacher);

    //if(validateTeacher.id !== teacherId) return res.status(400).json("Id de profesor no válido");

    //TODO PARA PODER CONTINUAR NECESITO PRIMERO AGREGAR ALUMNOS A LAS SECCIONES

    const test = await Course.findByPk(createCourse.id,{
      include: [
        {
          model: Section,
          include: [
            {
              model: Grade
            }
          ]
        },
        {
          model: Teacher
        }
      ]
    });

      return res.status(200).json(validateGrade);

    
    next();

  }catch(err){
    console.error(err);
    next(err);
  }

}

module.exports = {
  createCourse
}