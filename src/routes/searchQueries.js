const { Router } = require('express');
const { searchUser } = require('../controllers/searchQueries.js');

const router = Router();

router.get('/searchUser', searchUser);

module.exports = router;