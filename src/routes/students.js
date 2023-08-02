const { Router } = require('express');
const { assignStudents, searchSectionStudents, findAllStudents, findStudentSection, findStudentInfo, findCalifications, findStudentCourses } = require('../controllers/students.js');
const router = Router();

router.get('/searchSectionStudents', searchSectionStudents);
router.post('/assignStudents', assignStudents);
router.get('/searchAllStudents', findAllStudents);
router.get('/findStudentSection', findStudentSection);
router.get('/studentInformation', findStudentInfo);
router.get('/studentCalifications', findCalifications);
router.get('/studentCourses', findStudentCourses);

module.exports = router;