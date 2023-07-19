const { Year, Teacher } = require('../db.js');
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

module.exports = {
  searchTeacherCourses
}