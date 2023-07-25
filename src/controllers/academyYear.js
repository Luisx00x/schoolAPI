const { Year, Grade, Section } = require('../db.js');
const { gradeAssignment } = require('../helpers/academyYearHandlers.js');

const newYearController = async (req, res, next) => {

  const { newYear, initial, elementary, secundary } = req.body;

  try{

    if(!newYear) return res.status(400).json("Falta ingresar un año"); 
    if(initial.length < 1 && elementary.length < 1 && secundary.length < 1) return res.status(400).json("Falta al menos una sección en al menos un nivel")
    const searchYear = await Year.findOne({
      where: {
        year: newYear
      }
    })

    console.log(searchYear)

   /*  const test = await Year.findOne({
      where: {
        year: newYear
      },
      include: [
        {
          model: Grade,
          include: [
            {
              model: Section
            }
          ]
        }
      ]
    }) */

    if(searchYear) return res.status(200).json("El año que intenta crear ya existe");

    const createYear = await Year.create(
      {
        year: newYear
      }
    )

    //Eduación inicial  
    if(initial?.length > 0) await gradeAssignment(createYear.id, initial, "Inicial");

    //Primaria
    if(elementary?.length > 0) await gradeAssignment(createYear.id, elementary, "Primaria");

    //Segundaria
    if(secundary?.length > 0) await gradeAssignment(createYear.id, secundary, "Secundaria");

    return res.status(200).json("El nuevo año escolar fue creado exitosamente!");

  }catch(err){
    console.log(err)
    next()
  }

}

module.exports = {
  newYearController
}