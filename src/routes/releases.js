const { Router } = require('express');
const { searchReleases } = require('../controllers/SectionReleases');
const { findOneStudent } = require('../controllers/studentReleases');

const router = Router();

router.get('/searchSection', searchReleases);
router.get('/findStudentReleases', findOneStudent);

module.exports = router;