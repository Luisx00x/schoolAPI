const { SectionReleases, StudentReleases, Teacher, Section, Student } = require('../db.js');

const createRelease = async (req, res, next) => {

  try{

    const { userRol, sender, title, sectionId, studentId } = req.body;
    const {filename} = req.file;

    if(!userRol) return res.status(400).json("El solicitante no es un usuario");
    if(!title) return res.status(400).json("Falta ingresar un titulo");
    if(!sender) return res.status(400).json("Falta especificar quien envia");

    if(sectionId){

      if(userRol == 3){
  
        const teacherInfo = await Teacher.findByPk(sender);
  
        if(!teacherInfo) return res.status(400).json("No hay registros de ese profesor");
  
        const searchSection = await Section.findByPk(sectionId);
  
        if(!searchSection) return res.status(400).json("No existe esa sección");
  
        const senderValue = `${teacherInfo.name} ${teacherInfo.lastName}`;
  
        const newRelease = await SectionReleases.create({
          title,
          sender: senderValue,
          location: filename
        })
  
        //Conexion con sectionID para hacer las queries
        await newRelease.setSection(sectionId);
  
        return res.status(200).json("TODO OK")
      }

      //TODO AQUI VA SI ES ADMIN

    }

    if(studentId){

      if(userRol == 3){

        const teacherInfo = await Teacher.findByPk(sender);
  
        if(!teacherInfo) return res.status(400).json("No hay registros de ese profesor");
  
        const searchSection = await Student.findByPk(studentId);
  
        if(!searchSection) return res.status(400).json("No existe esa sección");
  
        const senderValue = `${teacherInfo.name} ${teacherInfo.lastName}`;
  
        const newRelease = await StudentReleases.create({
          title,
          sender: senderValue,
          location: filename
        })
  
        //Conexion con sectionID para hacer las queries
        await newRelease.setStudent(studentId);
  
        return res.status(200).json("TODO OK")
      }

    }
    
    if(!sectionId) return res.status(400).json("Falta la sección destino");

    //Si el enviante es un profesro


    return res.status(200).json("todo ok");

  }catch(err){
    next(err);
  }

}

const searchReleases = async (req, res, next) => {

  try{

    const { sectionId } = req.query;

    if(!sectionId) return res.status(400).json("No hay una sección para buscar");

    const searchReleases = await SectionReleases.findAll({
      where: {
        SectionId: sectionId
      }
    })

    if(!searchReleases) return res.status(200).json("No se encontraron comunicados para esta sección");

    return res.status(200).json(searchReleases);

  }catch(err){
    next(err);
  }

}

module.exports = {
  createRelease,
  searchReleases
}