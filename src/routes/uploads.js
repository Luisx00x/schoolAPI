const { Router } = require('express');
const { uploadHomework } = require('../controllers/homeworks');
const multer = require('multer');
const { uploadClasses } = require('../controllers/classes');
const router = Router();

//Multer
const homeworkStorage = multer.diskStorage({
  //filename para asignarle un nuevo nombre al archivo entrante
  filename: function (res, file, cb) {
    const filename = file.originalname.split('.');
    const ext = filename.pop();
    const date = Date.now();
    cb(null, `${filename}${date}.${ext}`);
  },
  //donde se va a almacenar el archivo
  destination: function (res, file, cb){
    cb(null, `./public/homeworks`);
  }
});

const homeworksMiddle = multer({storage: homeworkStorage})

router.post('/homeworks', homeworksMiddle.single('newHomework'), uploadHomework);

//Subida de clases
const classesStorage = multer.diskStorage({
  filename: function(res, file, cb){
    const filename = file.originalname.split('.');
    const ext = filename.pop();
    const date = Date.now();
    cb(null, `${filename}_${date}.${ext}`);
  },
  destination: function (res, file, cb) {
    cb(null, `./public/classes`);
  }
});

const clasessMiddle = multer({storage: classesStorage});

router.post(`/classes`, clasessMiddle.single(`newClass`), uploadClasses);



module.exports = router;
