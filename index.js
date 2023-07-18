const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//MOCK
const { User, Rols, Student, Representative, Administration, Teacher, Course, Year, Grade, Section, Homework, Calification, Absences } = require('./src/db.js');
const { user, rols, estudiantes, apoderados, profesores, materias} = require('./src/Mock.js');
const { newPassword } = require('./src/helpers/setUsersHandler.js');
//*

const PORT = process.env.DB_DEPLOY_PORT || 3001;

//"0.0.0.0" por poblema de host de railway
conn.sync({force: false})
.then( ()=> {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`listening at port ${PORT}`)
  })
})

.then( () => {

  ( async function () {
    
   /*  rols.map( async ele => await Rols.create(ele)) */
  
  }())

})
/* 
.then( () => {
  ( async function () {

    const encryptedPassword = await newPassword("password");

    const user = await User.create({userName: "Rubelino123", password: encryptedPassword});
    user.setRol(1);
    
    const admin = await Administration.create({name: "Ruben", lastName: "Russio", email: "erusion@mail.com"})
    await admin.setUser(1);
  }())



}) */

//MOCK
/* 
.then( () => {

  //año_escolar
  (async function(){
    await Year.create({year: 2022})
    const annio = await Year.create({year: 2023})
    await Year.create({year: 2024});
  }());

  //Grados

  (async function(){
    const grad = await Grade.create({grade: "primaria"})
    const grad2 = await Grade.create({grade: "secundaria"})
    const grad3 = await Grade.create({grade: "inicial"})
    await grad.setYear(1)
    await grad2.setYear(2)
    await grad3.setYear(2)
  }());

  //SEcciones
  ( async function (){
    const sec = await Section.create({sectionName: "A"})
    const sec2 = await Section.create({sectionName: "B"})
    const sec3 = await Section.create({sectionName: "C"})

    //* Evaluando si un la relacion curso-grado es uno a muchos o no.
    await sec.setGrade(1);
    //VIGENTE
    //await sec.setCourse(2);
    await sec.addCourses(2);

    await sec2.setGrade(1);

    await sec3.setGrade(2);
    await sec3.addCourses(3);
    await sec3.addStudents(1);
    await sec3.addStudents(2);

    //Asignar alumnos a secciones
    await sec.addStudents(1);
    await sec.addStudents(2);
    
  }());


  //profesor
  profesores.map( async (ele, index) => {
    const profe = await Teacher.create(ele)
    await profe.setUser(index+3) //asignado
  });



  //materias
  materias.map( async (ele) => {
    const mat = await Course.create(ele);
    await mat.setTeacher(1)
    await mat.addStudents(1)
    await mat.addStudents(2)

    //const test = await Course.findOne({where: {id:1}}); //asignando horario
    //test.update({init: "10:00", end: "13:00"})    
  });

  //Tareas

  (async function () {

    const tarea = await Homework.create({asignation: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas , las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye "})
    //asignacion de tarea a un profesor abajo con la asignacion del profesor
    tarea.setTeacher(1) //asignacion a un profesor
    tarea.setCourse(2) //asignacion a un curso
  }());

  (async function () {
    const cali = await Calification.create({
      evaluationTitle: "Examen 1",
      grade: "A"
    })
      await cali.setStudent(1);    //asigna a un estudiante
      await cali.setTeacher(1);    //asigna a un profesor
      await cali.setCourse(2);
  }());

  apoderados.map( async (ele) => {
    const apoder = await Representative.create(ele)
    apoder.setStudents(2) //Se asigna el apoderado a un alumno
    apoder.setUser(4)   //Un apoderado tiene userName y password
    apoder.setStudents(1) //Un apoderado puede representar a más de 1 alumno
  })

  
  estudiantes.map( async (ele, index) => {
    const estudiante = await Student.create(ele)
   //  await estudiante.setRols(2) 
    await estudiante.setUser(index+1)
  })

  //Roles
  rols.map( async ele => await Rols.create(ele))

  user.map( async ele => {
    const result = await User.create(ele)
    await result.setRol(2);
  })
})

.then( () => {
//Usuario profesor
  (async function () {
    const user = await User.create({
      name: "Rodolfo",
      lastName: "Panadeiro",
      userName: "Rodolfon",
      password: 34567
    })
    await user.setRol(3)
  }());

  (async function (){
    const user = await User.create({
      name: "Antonio",
      lastName: "Antonino",
      userName: "Aaantony",
      password: "500deesas"
    })
    await user.setRol(3)
  }());

  //usuario apoderado
  (async function () {
    const user = await User.create({
      name: "Juan",
      lastName: "Reyes xD",
      userName: "Juaaan",
      password: "500dePerejil"
    })
    await user.setRol(4)
  }());

  (async function (){
    const abs = await Absences.create({absences: 5})
    await abs.setStudent(1); //asignando estas inasistencias al alumno 1
    await abs.setCourse(3); //asignando estas inasistencias a quimica
  }());

  //Administrativos

  //( async function () {

  //  const encryptedPassword = await newPassword("password");

  //  const user = await User.create({userName: "Rubelino123", password: encryptedPassword});
  //  user.setRol(1);
    
  //  const admin = await Administration.create({name: "Ruben", lastName: "Russio", email: "erusion@mail.com"})
  //  await admin.setUser(6);
  //}());


}) */
