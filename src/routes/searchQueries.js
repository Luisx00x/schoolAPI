const { Router } = require('express');
const { searchUser, searchGrades, searchTeachers, searchActiveStudents, findUserData} = require('../controllers/searchQueries.js');

const router = Router();

router.get('/searchUser', searchUser);
router.get('/searchGrades', searchGrades);
router.get('/searchTeachers', searchTeachers);
router.get('/searchActiveStudents', searchActiveStudents);
router.get('/searchOneUser', findUserData);

module.exports = router;