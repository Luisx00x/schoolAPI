const { Router } = require('express');
const { getHomeworks, getAnswers, studentsHomeworks, homeworkCalification } = require('../controllers/homeworks');
const router = Router();

router.get('/getHomeworks', getHomeworks);
router.get('/getAnswers', getAnswers);
router.get('/homeworksAnswers', studentsHomeworks);
router.post('/homeworkCalification', homeworkCalification);

module.exports = router;