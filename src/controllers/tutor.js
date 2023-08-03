const { Tutor, User, Section, Course, Grade, Year, Absences, Student } = require('../db.js');

const tutorSection = async (req, res, next) => {

  try{
  const { userId, year } = req.query;

  const setYear = year || new Date().getFullYear();

  const findYear = await Year.findOne({
    where: {
      year: setYear
    }
  })
  
  if(!userId) return res.status(400).json("Falta un usuario");

  const findUser = await User.findByPk(userId,{
    include: [
      {
        model: Tutor,
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
      }
    ]
  });

  if(!findUser) return res.status(400).json("No existe el tutor");

  const findSections = findUser.Tutor.Sections.filter( section => section.Grade.YearId == findYear.id);

  return res.status(200).json(findSections);

  }catch(err){
    next(err);
  }

}

const allStudentAbsences = async (req, res, next) => {

  try{
    
    const { students, sectionId, year } = req.body;
    
    if(!students || students.length < 1) return res.status(400).json("Se necesita al menos un alumno");
    if(!sectionId) return res.status(400).json("Se necesita una sección");

    const setYear = year || new Date().getFullYear();

    const findSection = await Section.findByPk(sectionId,{
      include: [
        {
          model: Course
        }
      ]
    })
    
    //Obteniendo los ids de los cursos
    const courses = findSection.Courses.map( course => course.id)

    //Obteniedo los ids de los estudiantes
    const studentsId = students.map(student => student.id)

    const studentsAbsences = await Absences.findAll({
      where: {
        StudentId: studentsId,
        CourseId: courses
      }
    })

    //Usar los ids de los estudiantes para sumar las absences

    const absencesTotal = [];

    studentsId.forEach( student => {

      let total = {
        id: student,
        absences: 0,
        justifiedFault: 0,
        delays: 0 
      }

      studentsAbsences.forEach( absence => {
        if(absence.StudentId == student){
          total = {
            ...total,
            absences: total.absences + absence.absences,
            justifiedFault: total.justifiedFault + absence.justifiedFault,
            delays: total.delays + absence.delays
          }
        }
      })

      absencesTotal.push(total)
    })

    return res.status(200).json(absencesTotal);

  }catch(err){
    next(err);
  }
}

module.exports = {
  tutorSection,
  allStudentAbsences
}