const { Router } = require('express');
const { assignStudents, searchSectionStudents, findAllStudents, findStudentSection, findStudentInfo, findCalifications, findStudentCourses } = require('../controllers/students.js');
const { verifyStudent } = require('../controllers/academyYear.js');
const router = Router();

router.get('/searchSectionStudents', searchSectionStudents);
router.post('/assignStudents', assignStudents);
router.get('/searchAllStudents', findAllStudents);
router.get('/findStudentSection', findStudentSection);
router.get('/studentInformation', findStudentInfo);
router.get('/studentCalifications', findCalifications);
router.get('/studentCourses', findStudentCourses);
router.get('/verifyStudent', verifyStudent);

module.exports = router;