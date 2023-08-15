const express = require('express')
const router = express.Router()

const cities_controller=require('../controllers/cities_controller');

router.get('/', cities_controller.getCities)
router.get('/:cityId', cities_controller.getCity)
router.get('/:cityId/bars', cities_controller.getCityBars)
router.get('/:cityId/bars/:barId/lawyers', cities_controller.getBarsLawyers)

module.exports= router; 
