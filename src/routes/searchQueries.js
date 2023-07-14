const { Router } = require('express');
const { searchUser, searchGrades, searchTeachers} = require('../controllers/searchQueries.js');

const router = Router();

router.get('/searchUser', searchUser);
router.get('/searchGrades', searchGrades);
router.get('/searchTeachers', searchTeachers);

module.exports = router;