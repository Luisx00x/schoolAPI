const { Router } = require('express');
const { searchChilds } = require('../controllers/parents');
const router = Router();

router.get('/getChildsSignUp', searchChilds);

module.exports = router;