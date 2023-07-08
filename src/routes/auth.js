const { Router } = require('express');

const router = Router();

const { registerController, loginController } = require('../controllers/auth.js');

router.post('/login', loginController);

router.post('/register', registerController);

module.exports = router;