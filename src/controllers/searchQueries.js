const { Op } = require('sequelize');
const { Student, Teacher, Administration, Course, User, Representative, Grade, Section, Year } = require('../db.js');

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

const searchGrades = async (req, res, next) => {

  try{

    const { year } = req.query;

    if(!year) throw Error("Falta el año de búsqueda");

    const searchYear = await Year.findOne({
      where: {
        year
      }
    })

    if(!searchYear) throw Error("No hay registros de ese año");

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

const studentsWithoutSection = async (req, res, next) => {

  const thisYear = new Date();

  try{

    //Año en curso => Busca los grados registrados
    const years = await Year.findOne({
      where: {
        year: thisYear.getFullYear()
      },
      include: [
        { model: Grade }
      ]
    })

    //Tengo los grados de este año vigente
    const grades = years.Grades.map( year => year.id);

    //Encuentro los grados correspondientes a los ids conseguidos
    const search = await Grade.findAll({
      where: {
        id: {
          [Op.or]: grades
        }
      },
      include: [
        { model: Section,
          include: [ { model: Course}]
        }
      ]
    });

    console.log(grades)

  return res.status(200).json(search);

  }catch(err){
    console.log(err);
    next(err)
}

}


module.exports = {
  searchUser,
  searchGrades,
  searchTeachers,
  studentsWithoutSection
}