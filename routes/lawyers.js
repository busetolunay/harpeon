const express = require('express');
const router = express.Router();

const lawyers_controller=require('../controllers/lawyers_controller');

router.get('/', lawyers_controller.getLawyers)
router.get('/:lawyerId', lawyers_controller.getLawyer)
router.post('/:lawyerId/rate', lawyers_controller.createRating) // :rateId koymali miyiz
router.get('/:lawyerId/rate/:rateId', lawyers_controller.getRating)
router.delete('/:lawyerId/rate/:rateId', lawyers_controller.deleteRating)
//router.post('/:lawyerId/request', lawyers_controller.createRequest)


module.exports=router;

// const {
    
// } = require('../controllers/lawyers_controller')