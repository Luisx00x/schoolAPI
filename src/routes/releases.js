const { Router } = require('express');
const { searchReleases } = require('../controllers/SectionReleases');
const { findOneStudent } = require('../controllers/studentReleases');
const { findParentReleases } = require('../controllers/parentsReleases');

const router = Router();

router.get('/searchSection', searchReleases);
router.get('/findStudentReleases', findOneStudent);
router.get('/findParentReleases', findParentReleases);

module.exports = router;