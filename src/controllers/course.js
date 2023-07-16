const { Course, Section, Teacher, Grade, Schedules } = require('../db.js');

const createCourse = async (req, res, next) => {

  const { 
    courseName,  
    gradeId, 
    days,   //Array de objetos, una posicion por dia, un objeto con dia, y horas
    teacherId, 
    sectionId,
  } = req.body;

  try{

    if(!courseName) return res.status(400).json("No ha ingresado un nombre para el curso");
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
        },
        {
          model: Schedules
        }
      ]
    });

    
    //* REQUIERE UNA SECCIÓN PARA COMPARAR CON EL NOMBRE DEL GRADO QUE RECIBE
    const valiadteCourse = searchCourse.find( ele => {
      
      if(ele.Section) return ele.Section.GradeId === parseInt(gradeId);
    })
    
    if(valiadteCourse) return res.status(200).json({msg: "El Curso ya existe", valiadteCourse});

    const createCourse = await Course.create({
      courseName
    });

    // Se busca al profesor ingresado
    const validateTeacher = await Teacher.findByPk(teacherId)
    //Se agrega el profesor
    await createCourse.setTeacher(validateTeacher.id);

    //Se agrega el curso a una sección

    const searchSection = await Section.findByPk(sectionId);

    //Se le agrega la seccion /=> Los alumnos estan en la seccion
    await searchSection.addCourses(createCourse.id);

    days.map(async day => {
      
      const newDayAssign = await Schedules.create(day)

      newDayAssign.setCourse(createCourse.id);

    })

    return res.status(200).json({msg: "Se ha agregado la sección exitosamente!", createCourse});

  }catch(err){
    console.error(err);
    next(err);
  }

}

module.exports = {
  createCourse
}