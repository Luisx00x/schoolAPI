const { Router } = require('express');
const { searchReleases, findAllSectionReleases } = require('../controllers/SectionReleases');
const { findOneStudent } = require('../controllers/studentReleases');
const { findParentReleases } = require('../controllers/parentsReleases');
const { getTeacherCourses } = require('../controllers/courseReleases');

const router = Router();

router.get('/searchSection', searchReleases);
router.get('/allSectionReleases', findAllSectionReleases);
router.get('/findStudentReleases', findOneStudent);
router.get('/findParentReleases', findParentReleases);
router.get('/findTeacherCourses', getTeacherCourses);

module.exports = router;