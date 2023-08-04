const { Router } = require('express');
const { tutorSection, allStudentAbsences, findAttendanse, receibeAttendances } = require('../controllers/tutor');
const router = Router();

router.get(`/tutorSection`, tutorSection);
router.post(`/sectionAbsences`, allStudentAbsences);
router.post(`/searchAttendances`, findAttendanse);
router.post('/settingAttendances', receibeAttendances);

module.exports = router;