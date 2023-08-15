const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const {getCitiesService,getCityService,getCityBarsService,getBarsLawyersService}= require("../services/citiesService")

const getCities = async (req,res)=>{
  const response= await getCitiesService(req, res)
  if(response.status != 200){
    res.status(response.status).json(response.message)
  }
  res.status(response.status).json(response.data);
};

const   getCity = async (req,res)=>{
    const cityId = req.params.cityId;
    const response= await getCityService(cityId, res)
  if(response.status != 200){
    res.status(response.status).json(response.message)
  }
  res.status(response.status).json(response.data);
};


const  getCityBars = async (req,res)=>{ // buraya girmiyor
    const cityId = req.params.cityId;
    const response= await getCityBarsService(cityId, res)
  if(response.status != 200){
    res.status(response.status).json(response.message)
  }
  res.status(response.status).json(response.data);
};


const  getBarsLawyers = async (req,res)=>{// smt wrong here
  console.log('getCityBars')
  const response= await getBarsLawyersService(req, res)
  if(response.status != 200){
    res.status(response.status).json(response.message)
  }
  res.status(response.status).json(response.data);
};


module.exports=
{
    getCities,
    getCity,
    getCityBars,
    getBarsLawyers

    
}