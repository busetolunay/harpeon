const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const Rating = require('../models/rating');
const {getLawyersService,getLawyerService,createRatingService,deleteRatingService,getRatingService} = require("../services/lawyerService")

//getlawyers  getLawyer createRating   deleteRating   getRating

const getLawyers= async (req,res)=>{ // only gets available lawyer
  const barId = req.body.barId;
  const lawyers = await getLawyersService(barId,res);
  //console.log(lawyers)
  res.status(200).json(lawyers);
};


const getLawyer = async (req,res)=>{ 
    const lawyerId=req.params.lawyerId
    const response= await getLawyerService(lawyerId, res)
    if(response.status != 200){
      res.status(response.status).json(response.message)
    }
    res.status(response.status).json(response.data);
    
};


const createRating = async (req, res) => {
  const response= await createRatingService(req, res)
  if(response.status != 200){
    res.status(response.status).json(response.message)
  }
  res.status(200).json({message:"success"});
  };
  

  const deleteRating = async (req,res) =>{
    const response= await deleteRatingService(req, res)
  if(response.status != 200){
    res.status(response.status).json(response.message)
  }
  res.status(200).json({message:"success"});
  };


  const getRating = async (req, res) => {
    const rateId = req.params.rateId;
    const response= await getRatingService(rateId, res)
    if(response.status != 200){
    res.status(response.status).json(response.message)
  }
  res.status(200).json({message:"success"});
  };

  
  
/// BURADAYIM
  const createRequest = async (req, res) => {
     const lawyerId = req.params.lawyerId;
    res.redirect(`/requests`); 
  };


module.exports=
{
    getLawyer,
    getLawyers,
    createRating,
    deleteRating,
    getRating,
    deleteRating,
    createRequest
}