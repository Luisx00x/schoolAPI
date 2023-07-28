const { Router } = require('express');
const { createRelease, searchReleases } = require('../controllers/SectionReleases');

const router = Router();

router.get('/searchSection', searchReleases);

module.exports = router;