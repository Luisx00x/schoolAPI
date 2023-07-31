const { CourseReleases, Course } = require('../db.js');

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

module.exports = {
  getTeacherCourses
}