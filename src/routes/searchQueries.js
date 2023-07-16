const { Router } = require('express');
const { searchUser, searchGrades, searchTeachers, studentsWithoutSection} = require('../controllers/searchQueries.js');

const router = Router();

router.get('/searchUser', searchUser);
router.get('/searchGrades', searchGrades);
router.get('/searchTeachers', searchTeachers);
router.get('/studentNoSection', studentsWithoutSection);

module.exports = router;