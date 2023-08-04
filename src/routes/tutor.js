const { Router } = require('express');
const { tutorSection, allStudentAbsences, findAttendanse } = require('../controllers/tutor');
const router = Router();

router.get(`/tutorSection`, tutorSection);
router.post(`/sectionAbsences`, allStudentAbsences);
router.post(`/searchAttendances`, findAttendanse);

module.exports = router;