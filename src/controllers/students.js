const { Grade, Section, Student, Year, Course, Absences, Califications, User, Representative, Attendance, StudentReleases, ParentsReleases, SectionReleases, CourseReleases } = require('../db.js');

const assignStudents = async (req, res, next) => {

  try{

    const { sectionId, studentId, gradeId } = req.body;

    if(!gradeId) throw new Error("No se ha seleccionado un grado para buscar al alumno");
    if(!studentId) throw new Error("No se seleccionado un alumno")
    if(!sectionId) throw new Error("No se ha especificado una sección para el alumno");
    //if(!courseId) throw new Error("No ha seleccionado un curso para el alumno");

    const gradeSelected = await Grade.findByPk(gradeId, {
      include: [
        {model: Section}
      ]
    });

    if(!gradeSelected) return res.status(400).json("No existe el grado especificado");

    const sectionSelected = await Section.findByPk(sectionId, {
      include: [
        {model: Student},
        {model: Course}
      ]
    });

    if(!sectionSelected) return res.status(400).json("No existe la sección especificad");

    //Comprobación
    const studentGrade = await Student.findByPk(studentId,{
      include: [ 
        {
          model: Section, 
          include: [
            {model: Grade,
            include: [
              {model: Year}
            ]}
          ]
        }
      ]
    });

    const thisYear = new Date().getFullYear();

    //studentGrade.Sections.map( ele => console.log(ele.Grade.Year.year))

    if(studentGrade.Sections.find( section => section.Grade.Year.year <= thisYear)) {
      return res.status(200).json("El alumno ya se encuentra en una sección este año escolar");
    }
    const findStudent = await Student.findByPk(studentId);

    if(!findStudent) return res.status(400).json("No se ha encontrado a ese estudiante");

    //Se relaciona el estudiante con todos los cursos de la sección
    //sectionSelected.Courses
    
    
    await sectionSelected.Courses.map( async course => {

      const absencesAsignance = await Absences.create({absences: 0});

      const findCourse = await Course.findByPk(course.id);

      const createCalification = await Califications.create();
      
      if(!findCourse) return res.status(400).json("No hay curso");
      
      await createCalification.setStudent(findStudent.id);
      await createCalification.setCourse(findCourse.id);
      
      let calif = [];
      
      for(let i = 0; i < findCourse.skills.length; i++){
        calif.push(" ");
      }
      
      await createCalification.update({B1: calif, B2: calif, B3: calif, B4: calif });
      
      
      
      await absencesAsignance.setCourse(findCourse.id);
      await absencesAsignance.setStudent(findStudent.id);
    })
    
    const createAttendance = await Attendance.create();
    await createAttendance.setStudent(findStudent.id);
    await createAttendance.setSection(sectionId);

    let attent = [" ", " ", " ", " "];

    await createAttendance.update({ absences: attent, justifiedFault: attent, delays: attent });

    await sectionSelected.addStudents(findStudent.id);

    return res.status(200).json("El alumno se ha asignado a la sección exitosamente!");

  }catch(err){
    console.error(err);
    next(err);
  }

}

const searchSectionStudents = async (req, res, next) => {

  const { sectionId } = req.query;

  if(!sectionId) return res.status(200).json("Hace falta una sección");

  const searchSection = await Section.findByPk(sectionId,{
    include: {
      model: Student
    }
  });

  if(!searchSection) return res.status(200).json("No se encontro la sección que busca");

  return res.status(200).json(searchSection);

}

const findAllStudents = async (req, res, next) => {

  try{

    const searchStudents = await Student.findAll();
  
    return res.status(200).json(searchStudents);
    
  }catch(err){
    next(err);
  }

}

const findStudentSection = async (req, res, next) => {

  const { userId, year } = req.query;

  if(!userId) return res.status(400).json("Falta el estudiante");

  const setYear = year || new Date().getFullYear();

  const findYear = await Year.findOne({
    where:{
      year: setYear
    }
  })

  const comproveUser = await User.findByPk(userId);

  if(comproveUser.RolId != 2) return res.status(400).json("El usuario no es un estudiante");

  const findUser = await User.findByPk(userId,{
    include:[
      {
        model: Student,
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
      }
    ]
  });

  if(!findUser) return res.status(400).json("NO existe el usuario");

  const response = findUser.Student.Sections.find( section => section.Grade.YearId == findYear.id);

  return res.status(200).json(response);

}

const findStudentInfo = async (req, res, next) => {

  const { userId, year } = req.query;

  if(!userId) return res.status(400).json("Falta el estudiante");

  const setYear = year || new Date().getFullYear();

  const findUser = await User.findByPk(userId,{
    include: [
      {
        model: Student
      }
    ]
  })

  const studentInfo = findUser.Student;

  return res.status(200).json(studentInfo)

}

const findCalifications = async (req, res, next) => {

  try{

      const { sectionId, studentId } = req.query;

      if(!sectionId) return res.status(400).json("Se requiere una sección");
      if(!studentId) return res.status(400).json("Se requiere un estudiante");

      const findSection = await Section.findByPk(sectionId);

      if(!findSection) return res.status(400).json("No existe la sección");

      const findStudent = await Student.findByPk(studentId);
      if(!findStudent) return res.status(400).json("No existe el estudiante");

      const findCourses = await Course.findAll({
        where: {
          SectionId: findSection.id
        },
        include: [
          {
            model: Califications
          }
        ]
      })

      const studentCalifications = findCourses.map( (course, index) => { 
        return {
          id: course.id,
          course: course.courseName,
          skills: course.skills,
          califications: course.Califications.filter( calification => calification.StudentId == findStudent.id)
          }
        }) 
          //IDEA: MAPEAR DENTRO DEL FILTER PARA RETORNAR ORDENADAS LAS CAL
          
      const formatCalif = [];
      const proms = [];

      const test = studentCalifications.forEach( (course,index1) => {
        let data = []
        let prom = {}

        course.skills.forEach( (skill, index) => {
          let calif = {
            skill: skill
          }
          course.califications.forEach( (calification) => {
            prom = {...prom, [`prom${index+1}`]: calification[`prom${index+1}`] }
            calif = {
              ...calif,
              cal1: calification.B1[index],
              cal2: calification.B2[index],
              cal3: calification.B3[index],
              cal4: calification.B4[index],
            }
          })

          data.push(calif)
        })
        formatCalif.push(data)
        proms.push(prom)
      })

    const response = studentCalifications.map( (course, index) => {
      return {
        id: course.id,
        course: course.course,
        skills: formatCalif[index],
        proms: proms[index]
      }
    })

      return res.status(200).json(response);

  }catch(err){
    next(err);
  }
}

const getAllStudentReleases = async (req, res, next) => {

  try{

    const { studentId, sectionId } = req.query;

    //TODO NECESITO OBTENER TODAS LAS RELEASES DE STUDENT, PARENTS POR STUDENT ID Y TODAS LAS DE SECTION Y COURSE POR SECTIONID

    if(!studentId) return res.status(400).json("Se require un estudiante");
    if(!sectionId) return res.status(400).json("Se requirer una sección");

    const findStudent = await Student.findByPk(studentId);

    if(!findStudent) return res.status(400).json("No hay registros del estudiante");

    const findSection = await Section.findByPk(sectionId);

    if(!sectionId) return res.status(400).json("No existe la sección buscada");

    //* Consiguiento las releases de student

    //? Listo
    const findStudentReleases = await StudentReleases.findAll({
      where: {
        StudentId: studentId
      }
    })

    //* Consiguiento los releases de representative

    const findParent = await Representative.findAll({
      include: [
        {
          model: Student
        }
      ]
    })

    const parentDNI = findParent.find( parent => parent.Students.find( student => student.id == findStudent.id))

    //? Listo
    const findParentsReleases = await ParentsReleases.findAll({
      where: {
        RepresentativeDNI: parentDNI.DNI
      }
    })

    //* Consiguiendo las releases de section

    //? Listo
    const findSectionReleases = await SectionReleases.findAll({
      where: {
        SectionId: sectionId
      }
    })

    //* Consiguiendo las releases de course
    
    const courses = await Course.findAll({
      where: {
        SectionId: sectionId
      },
      attributes: ["id"]
    })

    const coursesId = courses.map( course => course.id)

    const findCoursesReleases = await CourseReleases.findAll({
      where: {
        CourseId: coursesId
      },
      include: [
        {
          model: Course,
          attributes: ["courseName"]
        }
      ]
    })

    const response = {
      student: [...findStudentReleases],
      representative: [...findParentsReleases],
      section: [...findSectionReleases],
      courses: [...findCoursesReleases]
    }

    return res.status(200).json(response);

  }catch(err){
    next(err);
  }
}

const findStudentCourses = async (req, res, next) => {

  try{

    const { sectionId } = req.query;

    if(!sectionId) return res.status(400).json("Se requiere una sección para obtener los cursos")

    const findSection = await Section.findByPk(sectionId,{
      include: [
        {
          model: Course,
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
        }
      ]
    });

    if(!findSection) return res.status(400).json("No existe la sección");

    return res.status(200).json(findSection.Courses)

  }catch(err){
    next(err)
  }
}

module.exports = {
  assignStudents,
  searchSectionStudents,
  findAllStudents,
  findStudentSection,
  findStudentInfo,
  findCalifications,
  getAllStudentReleases,
  findStudentCourses
}