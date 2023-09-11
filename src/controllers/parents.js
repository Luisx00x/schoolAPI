const { Representative, Student, User } = require('../db.js');

const findParentInfo = async (req, res, next) => {
  try{

    const {userId} = req.query;
    if(!userId) return res.status(400).json("Falta el id de usuario");

    const findUserInformation = await User.findByPk(userId, {
      include: [
        {
          model: Representative
        }
      ]
    })

    if(!findUserInformation) return res.status(400).json("No existe el usuario");
    if(findUserInformation.RolId != 4) return res.status(400).json("El usuario no es un apoderado");

    return res.status(200).json(findUserInformation.Representative)

  }catch(err){
    next(err);
  }
}

const searchChilds = async (req, res, next) => {

  try{
  
    const { representativeDNI } = req.query;

    if(!representativeDNI) return res.status(400).json("No se ha ingresado un apoderado para buscar");

    const searchChilds = await Representative.findByPk(representativeDNI, {
      include: [
        {
          model: Student
        }
      ]
    })

    return res.status(200).json(searchChilds.Students)

  }catch(err){
    next(err);
  }

}

module.exports = {
  findParentInfo,
  searchChilds
}