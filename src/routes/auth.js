const { Router } = require('express');

const router = Router();

const { registerController } = require('../controllers/auth.js');

//router.post('/login', loginController);

router.post('/register', registerController);

module.exports = router;