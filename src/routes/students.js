const { Router } = require('express');
const { assignStudents, searchSectionStudents, findAllStudents, findStudentSection, findStudentInfo } = require('../controllers/students.js');
const router = Router();

router.get('/searchSectionStudents', searchSectionStudents);
router.post('/assignStudents', assignStudents);
router.get('/searchAllStudents', findAllStudents);
router.get('/findStudentSection', findStudentSection);
router.get('/studentInformation', findStudentInfo);

module.exports = router;