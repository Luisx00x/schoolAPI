const { Course, Section, Year, Grade, Student } = require('../db.js');

const findAllSections = async (req, res, next) => {

  const { year } = req.query;

  const currentYear = new Date().getFullYear()

  let searchYear = year || currentYear;

  const findYear = await Year.findOne({
    where: {
      year: searchYear
    }
  })

  if(!findYear) return res.status(200).json("No hay registros del año buscado")

  const findSection = await Section.findAll({
    include: [
      {
        model: Grade
      },
      {
        model: Course
      },
      {
        model: Student
      }
    ]
  })

  const selectedSections = findSection.filter( section => section.Grade.YearId === findYear.id)

  return res.status(200).json(selectedSections); 

}

module.exports = {
  findAllSections
}