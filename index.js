const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//MOCK
const { User, Rols, Attendance, Student, Representative, Administration, Teacher, Course, Year, Grade, Section, Homework, Calification, Absences, Tutor } = require('./src/db.js');
const { user, rols, estudiantes, apoderados, profesores, materias} = require('./src/Mock.js');
const { newPassword } = require('./src/helpers/setUsersHandler.js');
//*

const port = process.env.PORT || 3001;

conn.sync({force: false})
.then( ()=> {
  server.listen(port, "0.0.0.0", () => {
    console.log(`%listening at port ${port}`)
  })
})
.then( () => {

  ( async function () {
    
    rols.map( async ele => {
      const findEle = await Rols.findOne({
        where: {
          name: ele.name
        }
      })

      if(!findEle) await Rols.create(ele)
    })
  
  }())

})

/* .then( () => {

  (async function () {

    const findAttendanse1 = await Attendance.findByPk(1)

    await findAttendanse1.setStudent(1);
    await findAttendanse1.setSection(1);

    const findAttendanse2 = await Attendance.findByPk(2)

    await findAttendanse2.setStudent(3);
    await findAttendanse2.setSection(1);

  }())

}) */


/* 

.then( () => {
  ( async function () {

    const encryptedPassword = await newPassword("1234");
    const encryptedPassword2 = await newPassword("1234");

    const user2 = await User.create({userName: "Ruben123", password: encryptedPassword2});
    user2.setRol(1);

    const admin = await Administration.create({name: "soy", lastName: "lacomadreja" });
    await admin.setUser(1);

    const user = await User.create({userName: "Coba123", password: encryptedPassword});
    user.setRol(3);
    
    const teacher = await Teacher.create({DNI:2134562, name: "Otro", lastName: "Coba", email: "OtroCoba@mail.com"})
    await teacher.setUser(2);

    //Mock de estudiante

    //? ANA
    const encryptedPassword3 = await newPassword("1234");

    const user3 = await User.create({userName: "Anabel123", password: encryptedPassword3});
    user3.setRol(2);

    const student1 = await Student.create({
      DNI: 21329313,
      names: "Ana Belen", 
      fatherLastName: "Fernandez", 
      motherLastName: "Guerra",
      birthdate: "1992-10-08",
      gender: "F",
      level: "Secundaria",
      grade: 6,
      religion: "Catolica",
      procedense: "otro colegio"
    });
    await student1.setUser(3);

    const encryptedPassword4 = await newPassword("1234");

    //? MARCOS
    const user4 = await User.create({userName: "Marcas", password: encryptedPassword4});
    user4.setRol(2);

    const student2 = await Student.create({
      DNI: 24329313,
      names: "Marcos David", 
      fatherLastName: "Fernandez", 
      motherLastName: "Guerra",
      birthdate: "1996-10-08",
      gender: "M",
      level: "Primaria",
      grade: 3,
      religion: "Catolica",
      procedense: "otro colegio"
    });
    await student2.setUser(4);

    //? JUAN
    const encryptedPassword5 = await newPassword("1234");

    const user5 = await User.create({userName: "Juanan", password: encryptedPassword5});
    user5.setRol(2);

    const student3 = await Student.create({
      DNI: 21329313,
      names: "Juan Antorio", 
      fatherLastName: "Perez", 
      motherLastName: "Muñoz",
      birthdate: "1999-10-08",
      gender: "M",
      level: "Inicial",
      grade: 1,
      religion: "Cristiano",
      procedense: "otro colegio2"
    });
    await student3.setUser(5);
  
    //APODERADOS
  
    const encryptedPassword6 = await newPassword("1234");

    const user6 = await User.create({userName: "MirGuer", password: encryptedPassword6});
    await user6.setRol(4);
    
    const representative1 = await Representative.create({
      names: "Mirian Carolina", 
      DNI: 123456, 
      lastNames: "Guerra", 
      address: "Calle A, Mz-B", 
      phone: "123456789", 
      civilStatus: "Divorciada", 
      celPhone: "456789123", 
      email: "MGuerra@mail.com", 
      workPlace: "Otro colegio", 
      ocuppation: "Directora", 
      RPMorRPC: ""
    })

    await representative1.setUser(6);
    await representative1.addStudents(student1.id);
    await representative1.addStudents(student2.id);

    const encryptedPassword7 = await newPassword("1234");

    const user7 = await User.create({userName: "JuanPer", password: encryptedPassword7});
    await user7.setRol(4);
    
    const representative2 = await Representative.create({
      names: "Juan Reinaldo", 
      DNI: 234561, 
      lastNames: "Perez Reyes", 
      address: "Calle B, Mz-D", 
      phone: "567894321", 
      civilStatus: "Viudp", 
      celPhone: "43256562", 
      email: "JPerez@mail.com", 
      workPlace: "Consultorio", 
      ocuppation: "Medico", 
      RPMorRPC: ""
    })

    await representative2.setUser(7);
    await representative2.addStudents(student3.id);

  }())

})
  */

/* .then( () => {
  
  (async function () {

    await Rols.create({name: "Tutor"})

    const encryptedPassword8 = await newPassword("1234");

    const user8 = await User.create({userName: "Tutor", password: encryptedPassword8});
    await user8.setRol(6);

    const tutor1 = await Tutor.create({
      names: "Pedro Pablo", 
      DNI: 234561123, 
      lastNames: "Perez Reyes", 
      email: "JPerez@mail.com", 
    })

    await tutor1.setUser(8);
   // await tutor1.setSection(1);

  }())

})
 */

/*  .then( () => {
  
  (async function () {

    const tutor = await Tutor.findByPk(234561123)
  
    await tutor.addSections(1);
    //await tutor.addSections(2);
  }())

}) 
 */

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
