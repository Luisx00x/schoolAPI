const { Course, Section, Teacher, Grade, Student } = require('../db.js');

const createCourse = async (req, res, next) => {

  const { courseName, init, end, gradeId, teacherId, sectionId} = req.body;

  try{

    if(!courseName) return res.status(400).json("No ha ingresado un nombre para el curso");
    if(!init) return res.status(400).json("No ha seleccionado una hora de inicio para el curso");
    if(!end) return res.status(400).json("No se ha seleccionado una una de finalización para el curso");
    if(!teacherId) return res.status(400).json("No se ha especificado un profesor");
    if(!sectionId) return res.status(400).json("No se ha especificado una sección");

    const searchCourse = await Course.findAll({
      where: {
        courseName
      },
      include: [
        {
          model: Section,
          include: [
            {
              model: Grade
            }
          ]
        }
      ]
    });

    //* REQUIERE UNA SECCIÓN PARA COMPARAR CON EL NOMBRE DEL GRADO QUE RECIBE
    const valiadteCourse = searchCourse.find( ele => {
      if(ele.Section) return ele.Section.GradeId === gradeId
    })

    if(valiadteCourse) return res.status(200).json({msg: "El Curso ya existe", valiadteCourse});

    const createCourse = await Course.create({
      courseName,
      init,
      end
    });

    // Se busca al profesor ingresado
    const validateTeacher = await Teacher.findByPk(teacherId)
    //Se agrega el profesor
    await createCourse.addTeachers(validateTeacher.id);

    //Se agrega el curso a una sección

    const searchSection = await Section.findByPk(sectionId);
    //Se le agrega la seccion /=> Los alumnos estan en la seccion
    await searchSection.setCourse(createCourse.id);

    return res.status(200).json({msg: "Se ha agregado la sección exitosamente!", createCourse});

  }catch(err){
    console.error(err);
    next(err);
  }

}

module.exports = {
  createCourse
}