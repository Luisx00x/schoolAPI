const { Router } = require('express');
const { createCourse } = require('../controllers/course.js');

const router = Router();

router.post('/courseCreation', createCourse);


module.exports = router;