const { Student, Teacher, Administration, Course, User, Representative } = require('../db.js');

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


module.exports = {
  searchUser
}