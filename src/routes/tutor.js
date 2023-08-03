const { Router } = require('express');
const { tutorSection, allStudentAbsences } = require('../controllers/tutor');
const router = Router();

router.get(`/tutorSection`, tutorSection);
router.post(`/sectionAbsences`, allStudentAbsences);

module.exports = router;