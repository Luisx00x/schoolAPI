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

const { User, Rols, Student, Representative } = sequelize.models;

//* Relaciones
//Rols-Usuarios Catalogo
Rols.hasOne(User);
User.belongsTo(Rols);

//Un usuario por cada Estudiante
User.hasOne(Student);
Student.belongsTo(User);

//Un usuario por cada apoderado
User.hasOne(Representative);
Representative.belongsTo(User);

//Un apoderdo representa a uno o más alumnos
Representative.hasMany(Student);
Student.belongsTo(Representative);

/* Rols.belongsToMany(Student, {through: 'RolStudent'});
Student.belongsToMany(Rols, {through: 'RolStudent'}); */

module.exports = {
  ...sequelize.models,
  conn: sequelize
}