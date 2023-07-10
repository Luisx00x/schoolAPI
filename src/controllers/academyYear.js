const { Year, Grade, Section } = require('../db.js');
const { gradeAssignment } = require('../helpers/academyYearHandlers.js');

const newYearController = async (req, res, next) => {

  const { newYear, initial, elementary, high } = req.body;

  //initial, elementary y high como objectos

  //? EDUCACION INICIAL  [ARR {Obj}]
  //? PRIMER GRADO, SEGUNDO GRADO, TERCER GRADO, CUARTO GRADO, QUINTO GRADO, SEXTO GRADO [ ARR { objeto }]
  //? PRIMER AÑO, SEGUNDO AÑO, TERCER AÑO, CUARTO AÑO, QUINTO AÑO, SEXTO AÑO  [ARR { obj }]
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

    //FORMATO
    /* {gradeName: "Primer Grado", sections: ["A", "B", "C"]} */

    //Eduación inicial
    if(initial.length > 0){

      await gradeAssignment(createYear.id, initial);

      /* for(let grade of initial){

        const newInitial = await Grade.create({
          grade: grade.gradeName
        })
  
        await newInitial.setYear(createYear.id);

        for(let section of grade.sections){

          const newSection = await Section.create({
            sectionName: section
          });

          await newSection.setGrade(newInitial.id);

        }

      } */


    }

    //Primaria
    if(elementary.length > 0){

      await gradeAssignment(createYear.id, elementary);

    /*   for(let grade of elementary){
        
        const newGrade = await Grade.create({
          grade: grade.gradeName
        });

        await newGrade.setYear(createYear.id);

        for(let section of grade.sections){

          const newSection = await Section.create({
            sectionName: section
          });

          await newSection.setGrade(newGrade.id)

        }

      } */

    }

    if(high.length > 0){

      await gradeAssignment(createYear.id, high)

     /*  for(let grade of high){
        
        const newGrade = await Grade.create({
          grade: grade.gradeName
        });

        await newGrade.setYear(createYear.id);

        for(let section of grade.sections){

          const newSection = await Section.create({
            sectionName: section
          });

          await newSection.setGrade(newGrade.id)

        }

      } */

    }
    
    
    const test = await Year.findByPk(createYear.id, {
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
    })
    return res.status(200).json(test)

    //return res.status(200).json("El nuevo año escolar fue creado exitosamente!");

  }catch(err){
    console.log(err)
    next()
  }

}

module.exports = {
  newYearController
}