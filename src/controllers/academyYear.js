const { Year, Grade, Section } = require('../db.js');
const { gradeAssignment } = require('../helpers/academyYearHandlers.js');

const newYearController = async (req, res, next) => {

  const { newYear, initial, elementary, high } = req.body;

  try{

    const searchYear = await Year.findOne({
      where: {
        year: newYear
      }
    })

    if(searchYear) return res.status(200).json("El año que intenta crear ya existe");

    const createYear = await Year.create(
      {
        year: newYear
      }
    )

    //Eduación inicial
    if(initial.length > 0) await gradeAssignment(createYear.id, initial);

    //Primaria
    if(elementary.length > 0) await gradeAssignment(createYear.id, elementary);

    //Segundaria
    if(high.length > 0) await gradeAssignment(createYear.id, high);

    return res.status(200).json("El nuevo año escolar fue creado exitosamente!");

  }catch(err){
    console.log(err)
    next()
  }

}

module.exports = {
  newYearController
}