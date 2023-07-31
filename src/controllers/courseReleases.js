const { CourseReleases, Course, Year, Section, Grade } = require('../db.js');

const getTeacherCourses = async (req, res, next) => {

  const { courseId } = req.query;

  if(!courseId) return res.status(400).json("Falta el curso");
  
  //Consigo todos los curso del profesor
  const findCourses = await CourseReleases.findAll({
    where: {
      CourseId: courseId
    }
  })
  
  return res.status(200).json(findCourses)

}

const getAllCoursesReleases = async (req, res, next) => {

    const { year } = req.query

    const setYear = year || new Date().getFullYear();

    const findYear = await Year.findOne({
      while: {
        year: setYear
      }
    })

    const findReleases = await CourseReleases.findAll({
      include: [
        {
          model: Course,
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
    })

    const response = findReleases.filter( release => release.Course.Section.Grade.YearId == findYear.id)

    return res.status(200).json(response)

}

module.exports = {
  getTeacherCourses,
  getAllCoursesReleases
}