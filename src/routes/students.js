const { Router } = require('express');
const { assignStudents } = require('../controllers/students.js');
const router = Router();

router.post('/assignStudents', assignStudents);

module.exports = router;