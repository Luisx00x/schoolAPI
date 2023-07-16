
const user = 
[
  {
    userName: "luisx00x",
    password: "12345"
  },
  {
    userName: "Pequeñuela",
    password: "Hakunamatata"
  }
]

const rols = [
  {
    name: "Admin"
  },
  {
    name: "Alumno"
  },
  {
    name: "Profesor"
  },
  {
    name: "Apoderado"
  },
  {
    name: "SuperAdmin"
  }
]

const apoderados = [
  {
    name: "Asdaldo",
    lastName: "Petrucio",
    email: "asda@gmail.com"
  }
]

const materias = [
  {
    courseName: "matematica",
    init: "10:00",
    end: "12:00"
  },
  {
    courseName: "fisica",
    init: "08:00",
    end: "10:00"
  },
  {
    courseName: "fisica",
    init: "14:00",
    end: "16:00"
  },
  {
    courseName: "quimica",
    init: "07:00",
    end: "08:00"
  }
]

const profesores = [
  {
    name: "Julio",
    lastName: "Manzanillo",
    email: "julio@mail.com"
  },
  {
    name: "Antonio",
    lastName: "Antonini",
    email: "antonio@mail.com"
  }
]

const estudiantes = [
  {
    name: "Anita",
    lastName: "Fibonacci",
    fatherName: "Luis",
    fatherLastName: "Antonini",
    motherName: "Ana",
    motherLastName: "Quintano"
  },
  {
    name: "Pedrito",
    lastName: "Fetuchinni",
    fatherName: "Pedro",
    motherName: "Maria",
  },
  {
    name: "Mauricio",
    lastName: "Test",
    fatherName: "Porfirio",
    motherName: "Antonella",
    isActive: false
  }
]

module.exports = {
  user,rols, estudiantes, apoderados, profesores, materias
}