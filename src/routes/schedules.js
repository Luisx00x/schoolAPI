const { Router } = require('express');
const { findStudentSchedules } = require('../controllers/schedules.');
const router = Router();

router.get('/student', findStudentSchedules);

module.exports = router;