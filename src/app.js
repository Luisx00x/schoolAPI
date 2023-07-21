const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');

//falta requerir las rutas
const routes = require('./routes/index.js');

const { uploadHomework } = require('./controllers/homeworks.js');

require('./db.js');

const server = express();

server.name = "API-colegio";

server.use(bodyParser.urlencoded( {extended: true, limit: '50mb'} ));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use( (req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-COntrol-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//multer

//server.post('/uploads/homeworks', homeworksMiddle.single('myFile'), uploadHomework);

/* const releasesStorage = multer.diskStorage({
  filename: function (res, file, cb) {
    const filename = file.originalname.split('.');
    const ext = filename.pop();
    const date = Date.now();
    cb(null, `${filename}_${date}.${ext}`);
  },
  destination: function(res, file, cb){
    cb(null, `./public/releases`);
  }
}) */


//middleware de las rutas
server.use('/', routes);

server.use( (err, req, res, next) =>{
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;