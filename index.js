const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//MOCK
const { User, Rols, Student, Representative } = require('./src/db.js');
const { user, rols, estudiantes, apoderados} = require('./src/Mock.js');
//*

const PORT = process.env.PORT || 3001;

conn.sync({force: true})
.then( ()=> {
  server.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
  })
})

//MOCK
.then( () => {

  apoderados.map( async (ele) => {
    const apoder = await Representative.create(ele)
    apoder.setStudents(2) //Se asigna el apoderado a un alumno
    apoder.setUser(4)   //Un apoderado tiene userName y password
    apoder.setStudents(1) //Un apoderado puede representar a más de 1 alumno
  })

  
  estudiantes.map( async (ele, index) => {
    const estudiante = await Student.create(ele)
   /*  await estudiante.setRols(2) */
    await estudiante.setUser(index+1)
  })

  rols.map( async ele => await Rols.create(ele))
  user.map( async ele => {
    const result = await User.create(ele)
    await result.setRol(2);
  })
})
.then( () => {
  (async function () {
    const user = await User.create({
      name: "Rodolfo",
      userName: "Rodolfon",
      password: 34567
    })
    await user.setRol(3)
  }());

  (async function () {
    const user = await User.create({
      name: "Juan",
      userName: "Juaaan",
      password: "500dePerejil"
    })
    await user.setRol(4)
  }())
})