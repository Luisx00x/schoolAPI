
const { ParentsReleases, Tutor, CourseReleases, Classes, SectionReleases, User, Rols, Student, Representative, Parents, Teacher, Course, Year, Grade, Section, Homework, Calification, Schedules, Absences, Administration } = require('../db.js');

async function test(req, res, next) {

  try{

    const response = await Student.findAll({
      include: [
        {
          model: Section
        }
      ]
    });

   /*  const response = await Student.findAll({
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
    }) */

    /* const response = await Calification.findAll({
      include: [
        {
          model: Student,
          include: [
            {
              model: User
            }
          ]
        },
        {
          model: Teacher,
          include: [
            {
              model: User
            }
          ]
        },
        {
          model: Course
        }
      ]
    }) */


   /*  const response = await Course.findAll({
      include: [
        {
          model:Section,
          include: [
            {
              model: Grade,
              include: [
                {
                  model: Year
                }
              ]
            }
          ]
        },
        {
          model: Student
        }
      ]
    })
 */
    //const response = await Grade.findAll()

      /* const response = await User.findAll({
        where:{
          RolId: 3
        },
        include: [
          {
            model: Rols
          },
          {
            model: Teacher,
            include: [
              {
                model: Course,
                include: [
                  {
                    model: Student
                  }
                ]
              }
            ]
          }
        ]
      })
 */
      //Cola de busqueda
     /*  const response = await User.findAll({
        where:{
          RolId: 2
        },
        include: [
          {
            model: Rols
          },
          {
            model: Student,
            include: [
              {
                model: Representative,
                include: [
                  {
                    model: User
                  }
                ]
              }
            ]
          }
        ]
      }) */

      /* const response = await User.findOne({
        include: [
          {
            model: Rols
          },
          {
            model: Student
          }
        ],
        where: {
          id:1
        }
      }) */

      return res.status(200).json(response)

  }catch(err){

  }
}

module.exports = test;