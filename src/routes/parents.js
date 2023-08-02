const { Router } = require('express');
const { searchChilds, findParentInfo } = require('../controllers/parents');
const router = Router();

router.get('/parentInfo', findParentInfo);
router.get('/getChildsSignUp', searchChilds);

module.exports = router;