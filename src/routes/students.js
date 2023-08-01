const { Router } = require('express');
const { assignStudents, searchSectionStudents, findAllStudents, findStudentSection, findStudentInfo, findCalifications } = require('../controllers/students.js');
const router = Router();

router.get('/searchSectionStudents', searchSectionStudents);
router.post('/assignStudents', assignStudents);
router.get('/searchAllStudents', findAllStudents);
router.get('/findStudentSection', findStudentSection);
router.get('/studentInformation', findStudentInfo);
router.get('/studentCalifications', findCalifications);

module.exports = router;