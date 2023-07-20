const { Student, Teacher, Representative, Administration, Course, Section, Schedules, User, Grade} = require('../db.js');

const searchCourse = async (searchId) => {

  const searchData = await Course.findByPk(searchId, {
    include: [
      {
        model: Schedules
      },
      {
        model: Section,
        include: [
          { model: Student}
        ]
      }
    ]
  });
  
  return searchData;
  
}

const findTeacherByPk = async (user) => {

  const findUser = await User.findByPk(user,{
    attributes: [],
    include: [{
      model: Teacher,
      include: [
        {
          model: Course,
          include: [
            { 
              model: Section,
              include: [
                { model: Grade },
                { 
                  model: Student, 
                  attributes: ["name","lastName"]}
              ]
            }
          ]
        }
      ]
    }]
  });

  return findUser;

}

module.exports = {
  searchCourse,
  findTeacherByPk
}