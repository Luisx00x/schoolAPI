const { Router } = require('express');
const { searchUser, searchGrades} = require('../controllers/searchQueries.js');

const router = Router();

router.get('/searchUser', searchUser);
router.get('/searchGrades', searchGrades);

module.exports = router;