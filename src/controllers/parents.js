const { Representative, Student } = require('../db.js');

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

    return res.status(200).json(searchChilds)

  }catch(err){
    next(err);
  }

}

module.exports = {
  searchChilds
}