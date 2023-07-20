const { Router } = require('express');
const { searchTeacherCourses, addAbsences } = require('../controllers/teacher');
const router = Router();

router.get('/yearGrades', searchTeacherCourses);
router.get('/absences', addAbsences);

module.exports = router;