const { Router } = require('express');
const { getHomeworks } = require('../controllers/homeworks');
const router = Router();

router.get('/getHomeworks', getHomeworks);

module.exports = router;