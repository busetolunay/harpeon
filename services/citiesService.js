const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const Rating = require('../models/rating');
 
const getCitiesService = async (req,res)=>{
    try {
        const cities = await City.find(); 
        return {status:200, data: cities };
      } 
      catch (error) {
        console.log(error)
        return {status:500, message: 'Internal server error' };
      }
}

const getCityService = async (cityId,res)=>{
    try {
        const city = await City.findById(cityId);
        if (!city) {
            return {status:404, message: 'City not found' };
        }
        return {status:200, data: city };
      } catch (error) {
        return {status:500, message: 'Internal server error' };
      }
}

const getCityBarsService = async (cityId,res)=>{
    try {
        const city = await City.findById(cityId);
        console.log(city)
        if (!city) {
            return {status:404, message: 'City not found' };
        }
    const bars = await Bar.find({ cityId:cityId });
    console.log(bars)
    if (bars.length===0) {
        return {status:404, message: 'No bars in this city' };
    }
    const data=bars
        return {status:200,data}
    } catch (error) {
        console.log(error)
        return {status:500, message: 'Internal server error' };
    }
}

const getBarsLawyersService = async (req,res)=>{
    const cityId = req.params.cityId;
    const barId = req.params.barId;
    try {
        const city = await City.findById(cityId);
        if (!city) {
            return {status:404, message: 'City not found' };
        }

      const lawyers = await Lawyer.find({ cityId:cityId, barId :barId});
      if (lawyers.length===0) {
        return {status:404, message: 'No lawyers in this bar' };
    }

      const data=lawyers
      return {status:200,data}

    } catch (error) {
        console.log(error)
        return {status:500, message: 'Internal server error' };
    }
}
module.exports= {getCitiesService,getCityService,getCityBarsService,getBarsLawyersService}