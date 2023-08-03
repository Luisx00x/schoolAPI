const { Router } = require('express');
const { getHomeworks, getAnswers } = require('../controllers/homeworks');
const router = Router();

router.get('/getHomeworks', getHomeworks);
router.get('/getAnswers', getAnswers);

module.exports = router;