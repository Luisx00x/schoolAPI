const { Router } = require('express');
const test = require('./testRoute.js');

const router = Router();

router.get('/test', test);

router.use('/', require('./auth.js'));
router.use('/', require('./course.js'));
router.use('/', require('./academyYear.js'));
router.use('/', require('./students.js'));
router.use('/teacher', require('./teacher.js'));
router.use('/parents', require('./parents.js'));
router.use('/queries', require('./searchQueries.js'));
router.use('/uploads', require('./uploads.js'));
router.use('/homeworks', require('./homeworks.js'));
router.use('/releases', require('./releases.js'));
router.use('/puppeteer', require('./reportCards.js'));

module.exports = router;