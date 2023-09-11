const { Router } = require('express');
const { genPDF } = require('../controllers/reportCards');
const router = Router();

router.post('/', genPDF)

module.exports = router;