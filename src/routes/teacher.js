const { Router } = require('express');
const { searchTeacherCourses, addAbsences, registerCalifications } = require('../controllers/teacher');
const router = Router();

router.get('/yearGrades', searchTeacherCourses);
router.post('/absences', addAbsences);
router.post('/submitCalifications', registerCalifications);

module.exports = router;