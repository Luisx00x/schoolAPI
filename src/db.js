require('dotenv').config();
const { Sequelize }  = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DEPLOY_PASSWORD,
  DB_DEPLOY_HOST,
  DB_DEPLOY_PORT,
  DB_DEPLOY_NAME
} = process.env;

const PASSWORD = DB_DEPLOY_PASSWORD || DB_PASSWORD;
const HOST = DB_DEPLOY_HOST || DB_HOST;
const PORT = DB_DEPLOY_PORT  || '';
const NAME = DB_DEPLOY_NAME || 'school';

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`,
  {
    logging: false,
    native: false
  });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map( (entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { 
  User,
  Rols,
  Student,
  Representative,
  Teacher,
  Administration,
  Schedules,
  Course,
  Year,
  Grade,
  Section,
  Homework,
  Califications,
  Absences,
  Classes
  } = sequelize.models;

//* Relaciones
//Rols-Usuarios Catalogo
Rols.hasOne(User);
User.belongsTo(Rols);

//un usuario por cada admin
User.hasOne(Administration);
Administration.belongsTo(User);

//Un usuario por cada Estudiante
User.hasOne(Student);
Student.belongsTo(User);

//Un estudiante puede pertenecer a muchas secciones - Una seccion tiene muchos estidiantes
Section.belongsToMany(Student, {through: "Student_Section"});
Student.belongsToMany(Section, {through: "Student_Section"});

//Un usuario por cada apoderado
User.hasOne(Representative);
Representative.belongsTo(User);

//Un apoderdo representa a uno o más alumnos
Representative.hasMany(Student);
Student.belongsTo(Representative);

//Un profesor tiene un usuario
User.hasOne(Teacher);
Teacher.belongsTo(User);

//Un profesor da clases en muchos cursos - Un curso puede tener muchos profesores
/* Teacher.belongsToMany(Course, {through: "Teacher_Course" });
Course.belongsToMany(Teacher, {through: "Teacher_Course"}); */
Teacher.hasMany(Course);
Course.belongsTo(Teacher)

//Un Curso tiene muchos alumnos - Un alumno tiene muchos cursos //??? //!EVALUANDO, PROABLEMENTE NO
/* Student.belongsToMany(Course, {through: "Student_Course"});
Course.belongsToMany(Student, {through: "Student_Course"}); */

//Un año escolar tiene muchos grados - Un grado tiene un año escolar
Year.hasMany(Grade);
Grade.belongsTo(Year);

//Un grado tiene varias secciones - una seccion tiene un grado
Grade.hasMany(Section);
Section.belongsTo(Grade);

//? Revisar
//Un curso tiene varias secciones - una seccion pertenece a un curso
//TODO CAMBIAR => UNA SECCION TIENE QUE TENER MUCHOS CURSOS - UN CURSO PERTENECE A UNA SECCION
/* Course.hasMany(Section);
Section.belongsTo(Course); */
//VIGENTE
/* Course.hasOne(Section);
Section.belongsTo(Course); */

Section.hasMany(Course);
Course.belongsTo(Section);

//Un curso/materia tiene muchos horarios - un horario le pertence a un curso
Course.hasMany(Schedules);
Schedules.belongsTo(Course);

//Una tarea pertenece a un profesor - un profesor tiene varias tareas
Teacher.hasMany(Homework);
Homework.belongsTo(Teacher);

//Un curso puede tener multiples tareas - una tarea pertenece a un curso
Course.hasMany(Homework);
Homework.belongsTo(Course);

//Subida de clases => igual que homeworks
Teacher.hasMany(Classes);
Classes.belongsTo(Teacher);

Course.hasMany(Classes);
Classes.belongsTo(Course);

//una calificación pertenece a un alumno - un alumno tiene varias calificaciones
Student.hasMany(Califications);
Califications.belongsTo(Student);

//Una calificacion pertenece a un profesor - un profesor hace varias calificaciones
Teacher.hasMany(Califications);
Califications.belongsTo(Teacher);

//Un curso tiene muchas calificaciones - una calificacion pertenece a un curso
Course.hasMany(Califications);
Califications.belongsTo(Course);

//un curso puede tener muchos registros inasistentes - un registro de inasistencia pertenece a un curso
Course.hasMany(Absences);
Absences.belongsTo(Course);

//un alumno puede tener muchos registros de inasistencias - un registro de inasistencia pertenece a un alumno 
Student.hasMany(Absences);
Absences.belongsTo(Student);


module.exports = {
  ...sequelize.models,
  conn: sequelize
}