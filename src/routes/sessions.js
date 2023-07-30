const { Router } = require('express');
const { getAllSessions } = require('../controllers/sessions');
const router = Router();

router.get('/getSessions', getAllSessions);

module.exports = router;