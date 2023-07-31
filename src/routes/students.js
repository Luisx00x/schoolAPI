const { Router } = require('express');
const { assignStudents, searchSectionStudents, findAllStudents } = require('../controllers/students.js');
const router = Router();

router.get('/searchSectionStudents', searchSectionStudents);
router.post('/assignStudents', assignStudents);
router.get('/searchAllStudents', findAllStudents);

module.exports = router;