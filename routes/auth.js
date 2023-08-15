const express = require('express');
const router = express.Router();

const auth_controller=require('../controllers/auth_controller');

router.post('/logout', auth_controller.logout)
router.post('/login', auth_controller.login)
router.post('/register', auth_controller.register)

// const {
//     login,
//     logout,
//     register
//   } = require('../controllers/auth_controller')

module.exports= router;  