const { Grade, Section, Student, Year, Course, Absences } = require('../db.js');

const assignStudents = async (req, res, next) => {

  try{

    const { sectionId, studentId, gradeId } = req.body;

    if(!gradeId) throw new Error("No se ha seleccionado un grado para buscar al alumno");
    if(!studentId) throw new Error("No se seleccionado un alumno")
    if(!sectionId) throw new Error("No se ha especificado una sección para el alumno");
    //if(!courseId) throw new Error("No ha seleccionado un curso para el alumno");

    const gradeSelected = await Grade.findByPk(gradeId, {
      include: [
        {model: Section}
      ]
    });

    if(!gradeSelected) return res.status(400).json("No existe el grado especificado");

    const sectionSelected = await Section.findByPk(sectionId, {
      include: [
        {model: Student},
        {model: Course}
      ]
    });

    if(!sectionSelected) return res.status(400).json("No existe la sección especificad");

    //Comprobación
    const studentGrade = await Student.findByPk(studentId,{
      include: [ 
        {
          model: Section, 
          include: [
            {model: Grade,
            include: [
              {model: Year}
            ]}
          ]
        }
      ]
    });

    const thisYear = new Date().getFullYear();

    //studentGrade.Sections.map( ele => console.log(ele.Grade.Year.year))

    if(studentGrade.Sections.find( section => section.Grade.Year.year <= thisYear)) {
      return res.status(200).json("El alumno ya se encuentra en una sección este año escolar");
    }
    const findStudent = await Student.findByPk(studentId);

    if(!findStudent) return res.status(400).json("No se ha encontrado a ese estudiante");

    //Se relaciona el estudiante con todos los cursos de la sección
    //sectionSelected.Courses
    
    const absencesAsignance = await Absences.create({absences: 0});

    sectionSelected.Courses.map( async course => {

      const findCourse = await Course.findByPk(course.id);

      await findCourse.setAbsences(absencesAsignance.id);

      await findStudent.setAbsences(absencesAsignance.id);
    })

    await sectionSelected.addStudents(findStudent.id);

    return res.status(200).json("El alumno se ha asignado a la sección exitosamente!");

  }catch(err){
    console.error(err);
    next(err);
  }

}

module.exports = {
  assignStudents
}