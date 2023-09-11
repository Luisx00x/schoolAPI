const { Router } = require('express');
const { findAllSections } = require('../controllers/sections');
const router = Router();

router.get(`/allSections`, findAllSections);

module.exports = router;