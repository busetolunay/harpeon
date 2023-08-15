const express = require('express')
const router = express.Router()

const requests_controller=require('../controllers/requests_controller');

router.get('/', requests_controller.getRequests )
router.post('/', requests_controller.postRequest)
router.get('/:requestId', requests_controller.getRequest)
router.delete('/:requestId', requests_controller.deleteRequest)
router.post('/:requestId', requests_controller.acceptRequest)

module.exports= router; 