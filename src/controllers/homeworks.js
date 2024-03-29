const { Homework, HomeworksAnswer, Student, Course, Section } = require('../db.js');

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

    const findCourse = await Course.findByPk(courseId,{
      include: [
        {
          model: Section,
          include: [
            {
              model: Student,
              attributes: ["id"]
            }
          ]
        }
      ]
    });
    
    if(!findCourse) return res.status(400).json("No existe el curso");
    
    const students = findCourse.Section.Students;

    const newHomework = await Homework.create({
      asignation: title,
      location: filename
    });
   
   
     await newHomework.setTeacher(teacherId);
   await newHomework.setCourse(courseId);
  
    await students.forEach( async student => {
      const newAnwser = await HomeworksAnswer.create()

      newAnwser.setHomework(newHomework.id);
      newAnwser.setStudent(student.id)
    })

    return res.status(200).json("La tarea se ha subido correctamente");
 
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
    if(rol < 1 && rol > 5) return res.status(404).json("No tienes autorización")

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

const uploadAnswer = async (req, res, next) => {

  try{

    if(!req.file) return res.status(404).json("No se encuentra el archivo")

    const { filename } = req.file;

    const { studentId, homeworkId } = req.body;

    if(!studentId) return res.status(400).json("Falta el id del estudiante");
    if(!homeworkId) return res.status(400).json("Falta el id del homework");

    const findStudent = Student.findByPk(studentId);

    if(!findStudent) return res.status(400).json("NO existe el estudiante");

    const findHomework = await Homework.findByPk(homeworkId);
    
    if(!findHomework) return res.status(400).json("NO existe esa tarea");

    const answerPlace = await HomeworksAnswer.findOne({
      where: {
        HomeworkId: homeworkId,
        StudentId: studentId
      }
    })

    if(!answerPlace) return res.status(400).json("El estudiante no tiene esta tarea asignada")

    await answerPlace.update({
      location: filename
    })

    return res.status(200).json("La respuesta se ha subido correctamente");

  }catch(err){
    next(err);
  }
}

const getAnswers = async (req, res, next) => {

  try{

    const findAnswers = await HomeworksAnswer.findAll()

    return res.status(200).json(findAnswers)

  }catch(err){
    next(err);
  }

}

const studentsHomeworks = async (req, res, next) => {

  try{

    const { homeworkId } = req.query;

    if(!homeworkId) return res.status(400).json("No se ha especificado una tarea");

    const findHomework = await Homework.findByPk(homeworkId,{
      include: [
        {
          model: HomeworksAnswer,
          include: [
            {
              model: Student,
              attributes: ["DNI","names","fatherLastName","motherLastName"]
            }
          ]
        }
      ]
    });

    if(!findHomework) return res.status(400).json("La tarea buscada no existe");

    
    return res.status(200).json(findHomework);



  }catch(err){
    next(err);
  }

}

const homeworkCalification = async (req, res, next) => {

  try{

    const { homeworkAnswerId, calification } = req.body

    if(!homeworkAnswerId) return res.status(400).json("No se ha establecido una tarea");
    if(!calification) return res.status(400).json("No se asignó una calificaición");

    const findHomeworkAnswer = await HomeworksAnswer.findByPk(homeworkAnswerId);

    if(!findHomeworkAnswer) return res.status(400).json("No hay registros de la tarea");

    await findHomeworkAnswer.update({
      calification
    })

    return res.status(200).json({title: "Asignación de Calificación", msg: "Calificación subida correctamente"});

  }catch(err){
    next(err);
  }

} 


module.exports = {
  uploadHomework,
  getHomeworks,
  uploadAnswer,
  getAnswers,
  studentsHomeworks,
  homeworkCalification
}