const { Attendance, Section, Tutor } = require('../db.js');

const searchAttendance = async (req, res, next) => {

  const { studentId } = req.query;

  if(!studentId) return res.status(400).json("Falta el id del estudiante");
  
  const findAttendance = await Attendance.findOne({
    where: {
      StudentId: studentId
    },
    include: [
      {
        model: Section,
        include: [
          {
            model: Tutor,
            attributes: ["names","lastNames"]
          }
        ]
      }
    ]
  })

  if(!findAttendance) return res.status(400).json("No se ha encontrado al alumno");

  const response = {
    justifiedFault: findAttendance.justifiedFault,
    absences: findAttendance.absences,
    delays: findAttendance.delays,
    tutorNames: findAttendance.Section.Tutor.names,
    tutorLastNames: findAttendance.Section.Tutor.lastNames  
  }

  return res.status(200).json(response);

}

module.exports = {
  searchAttendance
}