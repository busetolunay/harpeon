const express = require('express')
const router = express.Router()


router.get('/', getLocation)
router.post('/', postLocation)
router.put('/', postLocation)

module.exports=router;

