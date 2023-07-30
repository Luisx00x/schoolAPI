const { Classes } = require('../db.js');

const getAllSessions = async (req, res, next) => {

  try{

    const { courseId, teacherId, rol } = req.query;

    if(!courseId) return res.status(400).json("Se requiere un curso para la búsqueda");
    if(!rol) return res.status(400).json("El usuario require un rol");
    if(!teacherId) return res.status(400).json("Se requiere un profesor para la búsqueda");
    if(rol != 1){
      if(rol != 5){
        if(rol !=3){
          return res.status(400).json("No tienes autorización");
        }
      }
    }

    const findSessions = await Classes.findAll({
      where: {
        CourseId: courseId,
        TeacherId: teacherId
      }
    })

    if(!findSessions) return res.status(400).json("No hay sesiones subidas");

    return res.status(200).json(findSessions);

  }catch(err){
    next(err);
  }

}

module.exports = {
  getAllSessions
}