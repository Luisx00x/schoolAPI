const { Grade, Section } = require('../db.js');

const gradeAssignment = async (yearId, grades, level) =>{

  for(let grade of grades){

    const newGrade = await Grade.create({
      level,
      grade: grade.gradeName
    });
 
    await newGrade.setYear(yearId);
    
    for(let section of grade.sections){

      const newSection = await Section.create({
        sectionName: section
      });

      await newSection.setGrade(newGrade.id);

    }

  }

}

module.exports = {
  gradeAssignment
}