const { Router } = require('express');
const test = require('./testRoute.js');

const router = Router();

router.get('/test', test);

module.exports = router;