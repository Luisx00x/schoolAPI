const { Representative, ParentsReleases, Student } = require('../db.js');

const findParentReleases = async (req, res, next) => {

  const { studentId } = req.query;

  if(!studentId) return res.status(400).json("Falta un estudiante del cual buscar el apoderado");

  //Tengo al estudiante
  const findStudent = await Student.findByPk(studentId);

  if(!findStudent) return res.status(400).json("No existe el estudiante del cual quiere obtener el apoderado");
  
  const findRepresentative = await Representative.findByPk(findStudent.RepresentativeDNI);

  if(!findRepresentative) return res.status(400).json("El apoderado ingresado no existe");

  const findReleases = await ParentsReleases.findAll({
    where: {
      RepresentativeDNI: findRepresentative.DNI
    }
  })

  return res.status(200).json(findReleases);

}

module.exports = {
  findParentReleases
}