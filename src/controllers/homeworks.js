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


module.exports = {
  uploadHomework
}