const { Student, Teacher, StudentReleases } = require('../db.js');

const findOneStudent = async (req, res, next) => {

  try{

    const { studentId } = req.query;

    if(!studentId) return res.status(400).json("Falta un estudiante para buscar");

    const findStudent = await Student.findByPk(studentId);

    if(!findStudent) return res.status(400).json("El alumno que busca no existe");

    const findReleases = await StudentReleases.findAll({
      where: {
        StudentId: studentId
      }
    })

    return res.status(200).json(findReleases);

  }catch(err){
    next(err);
  }

}

module.exports = {
  findOneStudent
}