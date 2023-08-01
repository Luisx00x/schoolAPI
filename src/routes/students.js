const { Router } = require('express');
const { assignStudents, searchSectionStudents, findAllStudents, findStudentSection } = require('../controllers/students.js');
const router = Router();

router.get('/searchSectionStudents', searchSectionStudents);
router.post('/assignStudents', assignStudents);
router.get('/searchAllStudents', findAllStudents);
router.get('/findStudentSection', findStudentSection);

module.exports = router;