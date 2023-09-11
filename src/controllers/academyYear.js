const { Op } = require('sequelize');
const { Year, Grade, Section, Representative, Student, Parents } = require('../db.js');
const { gradeAssignment, formatParentsData } = require('../helpers/academyYearHandlers.js');

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

const verifyStudent = async (req, res, next) => {

  try{

    const { studentDNI, fatherDNI, motherDNI } = req.query;

    if(!fatherDNI && !motherDNI) return res.status(400).json("No se ha introducido información de un apoderado");

    
    if(fatherDNI) {
      
      const findFather = await Student.findOne({
        where: {
          RepresentativeDNI: fatherDNI,
          DNI: studentDNI
        },
        include: [
          {
            model: Representative
          },
          {
            model: Parents
          }
        ]
      })
      
      if(findFather) {
       
        const response = formatParentsData(findFather, "father");
        
        return res.status(200).json({payload: response})
      
      }
      
    }
    
    if(motherDNI){
      
      const findMother = await Student.findOne({
        where: {
          DNI: studentDNI,
          RepresentativeDNI: motherDNI
        },
        include: [
          {
            model: Representative
          },
          {
            model: Parents
          }
        ]
      })

      if(findMother){

        const response = formatParentsData(findMother, "mother");
        
        return res.status(200).json({payload: response});

      }

      
    }
    
    return res.status(200).json({msg: "Ingrese los datos del nuevo estudiante"});

  }catch(err){
    next(err);
  }

}

module.exports = {
  newYearController,
  verifyStudent
}