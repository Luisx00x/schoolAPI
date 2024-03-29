const { Op } = require('sequelize');
const { Student, Representative, Teacher, Administration, Course, User, Parents, Grade, Section, Year } = require('../db.js');
const { searchCourse, findTeacherByPk } = require('../helpers/searchQueriesHandlers.js');

const searchUser = async (req, res, next) => {

  try{

    const { users, applicant} = req.query;

    if(users === "student" && (applicant === "admin" || applicant === "superAdmin")){

      const searchStudents = await Student.findAll({
        include: [
          {
            model: User
          },
          {
            model: Representative,
            include: [
              {
                model: User
              }
            ]
          }
        ]
      });

      return res.status(200).json(searchStudents);

    }

    if(users === "teacher" && (applicant === "admin" || applicant === "superAdmin")){

      const searchTeacher = await Teacher.findAll({
        include: [
          {
            model: Course
          }
        ]
      });

      return res.status(200).json(searchTeacher);

    }

    //Cambiar por superAdmin
    if(users === "admin" && applicant === "admin"){

      const searchAdmin = await Administration.findAll({
        include: [
          {
            model: User
          }
        ]
      });

      return res.status(200).json(searchAdmin)

    }

    return res.status(200).json("No se encontro ningún usuario de ese tipo");

  }catch(err){
    console.error(err);
    next(err);
  }

}

const findUserData = async (req, res, next) => {

  try{

    const {user, rol, applicant} = req.query;

    if(!user) return res.status(400).json("Falta información: no hay usuario");
    if(!applicant) return res.status(400).json("Falta información: No hay información del aplicante");
    if(!rol) return res.status(400).json("Falta el rol buscado");

    //PROFESORES
    if(parseInt(rol) === 3 && (parseInt(applicant) === 1 || parseInt(applicant) === 3 || parseInt(applicant) === 5)){

      const findUser = await findTeacherByPk(user);
  
      return res.status(200).json(findUser)
    }

    next()

  }catch(err){
    console.error(err);
    next(err);
  }

}

const searchGrades = async (req, res, next) => {

  try{

    const { year } = req.query;

    if(!year) throw Error("Falta el año de búsqueda");

    const searchYear = await Year.findOne({
      where: {
        year
      }
    })

    if(!searchYear) return res.status(200).json([]);

    const searchingGrade = await Grade.findAll({
      where: {
        YearId: searchYear.id
      },
      include: [
        {
          model: Section
        }
      ]
    })

    return res.status(200).json(searchingGrade);

  }catch(err){
    console.error(err);
    next(err);
  }

}

const searchTeachers = async (req, res, next) => {

  try{

    const allTeachers = await Teacher.findAll({
      include: [{model: Course}]
    })

    if(allTeachers) return res.status(200).json(allTeachers);

    next();

  }catch(err){
    console.error(err);
    next(err);
  }
}

const searchActiveStudents = async (req, res, next) => {

  const activeStudents = await Student.findAll({
    where: {
      isActive: true
    },
    include: [
      {
        model: Parents
      },
      {
        model: Representative
      },
      {
        model: Section
      }
    ]
  })

  return res.status(200).json(activeStudents)

}

const searchById = async (req, res, next) => {

  const { searchId } = req.query;
  
  const userId = parseInt(req.query.rolId)

  if(!searchId) return res.status(400).json("No hay elemento para buscar");
  if(!Number(searchId)) return res.status(400).json("El valor ingresado no el formato correcto");
  
  if(userId === 1 || userId === 3){

    const searchData = await searchCourse(searchId);

    if(searchData) return res.status(200).json(searchData)
    
    next()

  }
  
  return res.status(400).json("No tienes acceso a esta información");


}

module.exports = {
  searchUser,
  searchGrades,
  searchTeachers,
  searchActiveStudents,
  findUserData,
  searchById
}