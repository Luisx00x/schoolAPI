const { Op } = require('sequelize');
const { Schedules, Section, Course } = require('../db.js');

const findStudentSchedules = async (req, res, next) => {
//TODO NECESITO EL ESTUDIANTE O LA SECCIÓN

  const { sectionId } = req.query;

  if(!sectionId) return res.status(400).json("Falta una sección para la búsqueda");

  //Se busca la seccion con los cursos para saber cuales son los cursos de los que se requiere el horario
  const findSection = await Section.findByPk(sectionId, {
    include: [
      {
        model: Course
      }
    ]
  })

  if(!findSection) return res.status(400).json("No existe la sección buscada");

  //id de los cursos
  const courses = [];

  findSection.Courses.forEach( course => courses.push(course.id))

  const findSchedules = await Schedules.findAll({
    where: {
      CourseId: courses
    },
    include: [
      {
        model: Course,
        attributes: ["id","courseName"]
      }
    ]
  })

  const schedules = [];

 courses.forEach( course => {

  const selectSchedules = findSchedules.filter( schedule => schedule.CourseId == course);

  schedules.push(selectSchedules)

 })
 //LO QUE BUSCO => {schedules: [{horario},{horario}], Course: courseName}

 const response = [];

 schedules.forEach( collection => {

  let schedules = {schedules: []}

    collection.forEach( schedule => {
      schedules = { schedules: [...schedules.schedules, {day: schedule.day, init: schedule.init, end: schedule.end}], Course: schedule.Course.courseName}
    })

    response.push(schedules)

 })

  return res.status(200).json(response)

}

module.exports = {
  findStudentSchedules
}