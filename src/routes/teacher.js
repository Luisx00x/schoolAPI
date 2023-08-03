const { Router } = require('express');
const { searchTeacherCourses, addAbsences, registerCalifications, searchAbsences, searchCalifications } = require('../controllers/teacher');
const router = Router();

router.get('/yearGrades', searchTeacherCourses);
router.get('/searchAbsences', searchAbsences);
router.post('/absences', addAbsences);
router.post('/submitCalifications', registerCalifications);
router.get('/califications', searchCalifications);

module.exports = router;