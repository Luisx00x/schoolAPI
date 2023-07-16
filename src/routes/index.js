const { Router } = require('express');
const test = require('./testRoute.js');

const router = Router();

router.get('/test', test);

router.use('/', require('./auth.js'));
router.use('/', require('./course.js'));
router.use('/', require('./academyYear.js'));
router.use('/', require('./students.js'));
router.use('/queries', require('./searchQueries.js'));

module.exports = router;