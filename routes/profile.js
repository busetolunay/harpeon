const express = require('express')
const router = express.Router()

const profile_controller=require('../controllers/profile_controller');

router.get('/', profile_controller.getProfile)
router.delete('/', profile_controller.deleteProfile)
router.put('/', profile_controller.updateProfile)

module.exports=router;
