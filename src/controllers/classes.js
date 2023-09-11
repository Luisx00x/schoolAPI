const { Classes } = require('../db.js');

const uploadClasses = async (req, res, next) => {

  try{

    const {filename} = req.file;
    const { title } = req.body;
    const teacherId = parseInt(req.body.teacherId);
    const courseId = parseInt(req.body.courseId);

    if(!courseId) return res.status(400).json("No hay un curso seleccionado");
    if(!title) return res.status(400).json("Falta un titulo");
    if(!filename) return res.status(400).json("Falta un nombre de archivo");
    if(!teacherId) return res.status(400).json("Falta el profesor");

    const newClass = await Classes.create({
      className: title,
      location: filename
    })

    await newClass.setTeacher(teacherId);
    await newClass.setCourse(courseId);


    res.status(200).json("La sesión se ha subido correctamente.");
    next()

  }catch(err){
    console.error(err);
    next(err);
  }


}


module.exports = {
  uploadClasses
}