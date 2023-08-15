const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const {getProfileService,updateProfileService,deleteProfileService}= require("../services/profileService")

const getProfile = async (req,res)=>{
    const lawyerId= req.user.id;
    const response= await getProfileService(lawyerId, res)
    if(response.status != 200){
      res.status(response.status).json(response.message)
    }
    res.status(response.status).json(response.data);
};


const updateProfile = async (req,res)=>{
  const response= await updateProfileService(req, res)
  if(response.status != 200){
    res.status(response.status).json(response.message)
  }
  res.status(response.status).json(response.data);
};


const deleteProfile = async (req,res)=>{
  const lawyerId = req.user.id;
  const response= await deleteProfileService(lawyerId, res)
  res.status(response.status).json(response.message)
};


module.exports=
{
    getProfile,
    updateProfile,
    deleteProfile
};