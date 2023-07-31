const { Router } = require('express');
const { createCourse, getAllCourses } = require('../controllers/course.js');

const router = Router();

router.post('/courseCreation', createCourse);
router.get('/allCourses', getAllCourses);


module.exports = router;