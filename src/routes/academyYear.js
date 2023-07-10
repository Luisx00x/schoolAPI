const { Router } = require('express');
const { newYearController } = require('../controllers/academyYear.js');

const router = Router();

router.post("/academyYear", newYearController);

module.exports = router;
