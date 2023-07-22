const { Homework } = require('../db.js');

const uploadHomework = async (req, res, next) => {
  
  try{

    const { filename } = req.file
    const { title } = req.body;
    const teacherId = parseInt(req.body.teacherId);
    const courseId = parseInt(req.body.courseId)

    if(!filename) return res.status(400).json("Falta un archivo");
    if(!title) return res.status(400).json("Falta el titulo de la asignación");
    if(!teacherId) return res.status(400).json("Falta un profesor");
    if(!courseId) return res.status(400).json("Falta un curso");

    const newHomework = await Homework.create({
      asignation: title,
      location: filename
    });

    newHomework.setTeacher(teacherId);
    newHomework.setCourse(courseId);


    res.status(200).json("TODO OK");
    next()
 
  }catch(err){
    console.error(err);
    next(err);
  }

}

const editHomework = async () => {

}

const respondeHomework = async () => {

}

const getHomeworks = async (req, res, next) => {

  try{

    const {courseId, teacherId, rol, year} = req.query;

    if(!courseId) return res.status(400).json("No hay curso para buscar");
    if(!teacherId) return res.status(400).json("No hay profesor para buscar");
    if(!rol) return res.status(400).json("No se ha ingresado un rol");
    if(rol != 5){
      if(rol != 3){
        if(rol !=1) return res.status(404).json("No tienes autorización")
      }
    }

    const searchHomeworks = await Homework.findAll({
      where: {
        TeacherId: teacherId,
        CourseId: courseId
      }
    })

    if(!searchHomeworks.length) return res.status(200).json("No hay ningún registro de tareas")

    return res.status(200).json(searchHomeworks)

  }catch(err){
    console.error(err);
    next(err);
  }

}


module.exports = {
  uploadHomework,
  getHomeworks
}