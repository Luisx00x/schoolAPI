const { Router } = require('express');
const { assignStudents, searchSectionStudents } = require('../controllers/students.js');
const router = Router();

router.get('/searchSectionStudents', searchSectionStudents);
router.post('/assignStudents', assignStudents);

module.exports = router;