const { Year, Teacher, Absences, Course } = require('../db.js');
const { findTeacherByPk } = require('../helpers/searchQueriesHandlers.js');

const searchTeacherCourses = async (req, res, next) => {
  
  try{

    const {user, rol, applicant, year } = req.query;
  
    if(!year) return res.status(400).json("No se ha ingreado un año de busqueda");
    if(!applicant) return res.status(400).json("No tienes acceso a esa información");
    if(!user) return res.status(400).json("Falta el usuario relacionado a la busqueda");
    if(!rol) return res.status(400).json("Falta el rol buscando");
  
    const findYear = await Year.findOne({
      where: {
        year
      }
    });

    const teacherId = await Teacher.findOne({
      where: {
        UserId: user
      }
    })

    if(!findYear) return res.status(400).json("No hay registros para ese año");
    if(!teacherId) return res.status(400).json("El usuario no es un profesor");
  
    if(parseInt(rol) === 3 && (parseInt(applicant) === 1 || parseInt(applicant) === 3 || parseInt(applicant) === 5)){
      
      const findUser = await findTeacherByPk(user);

      const response = findUser.Teacher.Courses.filter( course => course.Section.Grade.YearId === findYear.id);

      return res.status(200).json(response)

    }
  
  
    next()

    
  }catch(error){
    console.error(error);
    next(error);
  }


}

const addAbsences = async (req, res, next) => {
  
  //NECESITO UN CURSO Y UN ALUMNO
  try{

    const { courseId, studentId, absences } = req.body;

    if(!courseId) return res.status(400).json("Falta un curso");
    if(!studentId) return res.status(400).json("Falta un alumno");
    if(!absences && absences !== 0) return res.status(400).json("No ha ingresado cuantas inasistencias tiene el alumno");

    //UPDATE DE LA ABSENCES

    const course = await Course.findByPk(courseId,{
      include: [
        { model: Absences }
      ]
    });

    const student = course.Absences.find( absences => {
      if(absences.StudentId == studentId) return absences
    });

    const studentAbsences = await Absences.findByPk(student.StudentId);
    
    //Actualizando
    await studentAbsences.update({
      absences: absences
    })

    return res.status(200).json("Inasistencias actualizadas!")
    
  }catch(err){
    console.error(err);
    next(err);
  }

}

module.exports = {
  searchTeacherCourses,
  addAbsences
}