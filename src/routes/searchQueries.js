const { Router } = require('express');
const { searchUser, searchGrades, searchTeachers, searchActiveStudents} = require('../controllers/searchQueries.js');

const router = Router();

router.get('/searchUser', searchUser);
router.get('/searchGrades', searchGrades);
router.get('/searchTeachers', searchTeachers);
router.get('/searchActiveStudents', searchActiveStudents);

module.exports = router;