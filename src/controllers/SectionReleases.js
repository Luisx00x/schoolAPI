const { Grade, Course, SectionReleases, ParentsReleases, CourseReleases, StudentReleases, Representative, Teacher, Section, Student, Year } = require('../db.js');

const createRelease = async (req, res, next) => {

  try{

    const { userRol, sender, title, sectionId, courseId, studentId, representative } = req.body;
    const {filename} = req.file;

    if(!userRol) return res.status(400).json("El solicitante no es un usuario");
    if(!title) return res.status(400).json("Falta ingresar un titulo");
    if(!sender) return res.status(400).json("Falta especificar quien envia");

    //FALTA CONDICION PARA CUANDO SEA SOLO UN CURSO
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
      
      if(userRol == 1 || userRol == 5){

        if(sectionId && sectionId == "all"){

          const thisYear = new Date().getFullYear();

          const findYear = await Year.findOne({
            where: {
              year: thisYear
            }
          })

          const findSections = await Section.findAll({
            include: [
              {
                model: Grade
              }
            ]
          })

          if(!findSections) return res.status(400).json("NO hay secciones");

          const sections = findSections.filter( section => section.Grade.YearId == findYear.id);

          sections.map( async section => {

            const newRelease = await SectionReleases.create({
              title,
              sender,
              location: filename
            })

            await newRelease.setSection(section.id)

          })
          
          return res.status(200).json("TODO OK");

        }
        
        //CUANDO SE ES ADMIN Y SOLO SE MANDA A UNA SECCION
        if(sectionId){
  
          const findSection = await Section.findByPk(sectionId)
          
          if(!findSection) return res.status(400).json("Error: Falta la sección");

          const newRelease = await SectionReleases.create({
            title,
            sender,
            location: filename
          });

          await newRelease.setSection(findSection.id);

          return res.status(200).json("TODO OK");

        }

      }

    }

    if(representative){

      if(userRol == 3){

        const teacherInfo = await Teacher.findByPk(sender);
  
        if(!teacherInfo) return res.status(400).json("No hay registros de ese profesor");
  
        const searchStudent= await Student.findByPk(studentId);
  
        if(!searchStudent) return res.status(400).json("No existe el estudiante buscado");

        const findParent = await Representative.findByPk(searchStudent.RepresentativeDNI);

        if(!findParent) return res.status(400).json("El apoderado no existe");
  
        const senderValue = `${teacherInfo.name} ${teacherInfo.lastName}`;
  
        const newRelease = await ParentsReleases.create({
          title,
          sender: senderValue,
          studentId: studentId,
          location: filename
        })
  
        //Conexion con sectionID para hacer las queries
        await newRelease.setRepresentative(findParent.DNI);
  
        return res.status(200).json("TODO OK")

      }

      if(userRol == 1 || userRol == 5){

        const searchStudent= await Student.findByPk(studentId);
  
        if(!searchStudent) return res.status(400).json("No existe el estudiante buscado");

        const findParent = await Representative.findByPk(searchStudent.RepresentativeDNI);

        if(!findParent) return res.status(400).json("El apoderado no existe");
  
        const newRelease = await ParentsReleases.create({
          title,
          sender,
          studentId: studentId,
          location: filename
        })
  
        //Conexion con sectionID para hacer las queries
        await newRelease.setRepresentative(findParent.DNI);
  
        return res.status(200).json("TODO OK")

      }

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

      if(userRol == 1 || userRol == 5){

        const searchSection = await Student.findByPk(studentId);
  
        if(!searchSection) return res.status(400).json("No existe esa sección");
  
        const newRelease = await StudentReleases.create({
          title,
          sender,
          location: filename
        })
  
        //Conexion con sectionID para hacer las queries
        await newRelease.setStudent(studentId);
  
        return res.status(200).json("TODO OK")

      }

    }

    if(courseId){

      if(userRol == 3){

        const teacherInfo = await Teacher.findByPk(sender);

        if(!teacherInfo) return res.status(400).json("No hay registros de ese profesor");
  
        const findCourse= await Course.findByPk(courseId);
  
        if(!findCourse) return res.status(400).json("No existe el curso");
  
        const senderValue = `${teacherInfo.name} ${teacherInfo.lastName}`;
  
        const newRelease = await CourseReleases.create({
          title,
          sender: senderValue,
          location: filename
        })
  
        //Conexion con sectionID para hacer las queries
        await newRelease.setCourse(courseId);
  
        return res.status(200).json("TODO OK")

      }

      if(userRol == 1 || userRol == 5){
        
        const findCourse= await Course.findByPk(courseId);
  
        if(!findCourse) return res.status(400).json("No existe el curso");
  
  
        const newRelease = await CourseReleases.create({
          title,
          sender,
          location: filename
        })
  
        //Conexion con sectionID para hacer las queries
        await newRelease.setCourse(courseId);
  
        return res.status(200).json("TODO OK")

      }

    }

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

const findAllSectionReleases = async (req, res, next) => {

  try{

    const { year } = req.query;

    const currentYear = new Date().getFullYear()
  
    let searchYear = year || currentYear;
  
    const findYear = await Year.findOne({
      where: {
        year: searchYear
      }
    })

    const findSection = await SectionReleases.findAll({
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
    })

    const response = findSection.filter( section => section.Section.Grade.YearId === findYear.id)

    return res.status(200).json(response);

  }catch(err){
    next(err);
  }

}

module.exports = {
  createRelease,
  searchReleases,
  findAllSectionReleases
}