const { Year, Teacher, Absences, Course, Student, Califications } = require('../db.js');
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

const searchAbsences = async (req, res, next) => {
  
  try {

    const { courseId } = req.query;

    const searchAbsences = await Absences.findAll({
      where: {
        CourseId: courseId
      }
    })

    return res.status(200).json(searchAbsences);

  }catch(err){
    next(err)
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

const registerCalifications = async (req, res, next) => {

  console.log(req.body)
  
  try{

    const { calificationId, B1, B2, B3, B4, prom1, prom2, prom3, prom4 } = req.body;

    if(!B1 || !B2 || !B3 || !B4 ){
      return res.status(400).json("La data se encuentra imcompleta")
    }

    if(!calificationId) return res.status(400).json("Falta la id de la sección de calificaciones");
    
    const formatData = {
      B1: [],
      B2: [],
      B3: [],
      B4: [],
      prom1: "",
      prom2: "",
      prom3: "",
      prom4: ""
    }

    B1.forEach( (undefined, index) => {
      const evalB1 = B1[index] === "" ? " " : B1[index];
      formatData.B1.push(evalB1);
      const evalB2 = B2[index] === "" ? " " : B2[index];
      formatData.B2.push(evalB2);
      const evalB3 = B3[index] === "" ? " " : B3[index];
      formatData.B3.push(evalB3);
      const evalB4 = B4[index] === "" ? " " : B4[index];
      formatData.B4.push(evalB4);
    } )

    formatData.prom1 = prom1 === "" ? " " : prom1;
    formatData.prom2 = prom2 === "" ? " " : prom2;
    formatData.prom3 = prom3 === "" ? " " : prom3;
    formatData.prom4 = prom4 === "" ? " " : prom4;

    const searchCalification = await Califications.findByPk(calificationId);
    
    if(!searchCalification) return res.status(400).json("No existe la nota que desea actualizar")

    await searchCalification.update(formatData);
    
    return res.status(200).json("Subida de notas exitosa!")

    }catch(err){
      next(err);
    }

}

module.exports = {
  searchTeacherCourses,
  addAbsences,
  registerCalifications,
  searchAbsences
}