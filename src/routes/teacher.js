const { Router } = require('express');
const { searchTeacherCourses } = require('../controllers/teacher');
const router = Router();

router.get('/yearGrades', searchTeacherCourses);

module.exports = router;