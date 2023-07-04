
const { User, Rols, Student, Representative } = require('../db.js');

async function test(req, res, next) {

  try{

      const response = await User.findAll({
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
      })

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