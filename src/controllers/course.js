const { Course, Section, Teacher, Grade, Schedules, Year } = require('../db.js');

const createCourse = async (req, res, next) => {

  const { 
    courseName,  
    gradeId, 
    days,   //Array de objetos, una posicion por dia, un objeto con dia, y horas
    skills,
    Abbrev,
    teacherId, 
    sectionId,
  } = req.body;

  console.log(req.body)

  try{

    if(!courseName) return res.status(400).json("No ha ingresado un nombre para el curso");
    if(!teacherId) return res.status(400).json("No se ha especificado un profesor");
    if(!sectionId) return res.status(400).json("No se ha especificado una sección");
    if(days.length < 1) return res.status(400).json("Se tiene que establecer al menos un dia para el curso");
    if(skills.length < 1) return res.status(400).json("Debe haber al menos una competencia");
    if(Abbrev.length < 1) return res.status(400).json("Faltan abreviaciones de las competencias");

    let nameIncomplete = false;
    let nameIsEmpty = false;
    let dayEmpty = false;

    for(let skill of skills) {
      
      if(skill == false){
        nameIncomplete = true;
        break;
      }
      if(skill.charCodeAt() == 32) {
        nameIsEmpty = true;
        break;
      }
      
    }

    if(nameIncomplete) return res.status(400).json("Faltan nombres de una o más competencias");
    if(nameIsEmpty) return res.status(400).json("Una competencia no puede estar en blanco o empezar con espacio");

    nameIncomplete = false;
    nameIsEmpty = false;

    for(let abb of Abbrev) {

      if(abb == false) {
        nameIncomplete = true;
        break;
      }

      if(abb.charCodeAt() == 32) {
        nameIsEmpty = true;
        break;
      }

    }
    
    if(nameIncomplete) return res.status(400).json("Falta abreviatura de una o más competencias");
    if(nameIsEmpty) return res.status(400).json("Una abreviatura no puede estar en blanco o empezar con espacio");

    for(let day of days){

      if(day.day == false) {
        dayEmpty = true;
        break;
      }
      if(day.init == false){
        dayEmpty = true;
        break;
      }
      if(day.end == false){
        dayEmpty = true;
        break;
      }

    }

    if(dayEmpty) return res.status(400).json("Uno o más días especificados no tienen todos su datos")

    const searchCourse = await Course.findAll({
      where: {
        courseName
      },
      include: [
        {
          model: Section,
          include: [
            {
              model: Grade
            }
          ]
        },
        {
          model: Schedules
        }
      ]
    });

    
    //* REQUIERE UNA SECCIÓN PARA COMPARAR CON EL NOMBRE DEL GRADO QUE RECIBE
    const validatedCourse = searchCourse.find( ele => ele.Section.id === parseInt(sectionId));

    if(validatedCourse) return res.status(200).json("El Curso ya existe");

    const createCourse = await Course.create({
      courseName,
      skills,
      Abbrev
    });

    // Se busca al profesor ingresado
    const validateTeacher = await Teacher.findByPk(teacherId)
    //Se agrega el profesor
    await createCourse.setTeacher(validateTeacher.id);

    //Se agrega el curso a una sección

    const searchSection = await Section.findByPk(sectionId);

    //Se le agrega la seccion /=> Los alumnos estan en la seccion
    await searchSection.addCourses(createCourse.id);

    days.map(async day => {
      
      const newDayAssign = await Schedules.create(day)

      newDayAssign.setCourse(createCourse.id);

    })

    return res.status(200).json("Se ha agregado la sección exitosamente!");

  }catch(err){
    console.error(err);
    next(err);
  }

}

const getAllCourses = async (req, res, next) => {

  try{

    const { year } = req.query;

    const setYear = year || new Date().getFullYear();

    const findYear = Year.findOne({
      where: {
        year: setYear
      }
    })

    const findCourses = await Course.findAll({
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

    const response = findCourses.filter( course => course.Section.Grade.YearId == findYear.id)

    return res.status(200).json(findCourses)

  }catch(err){
    next(err);
  }

}

module.exports = {
  createCourse,
  getAllCourses
}