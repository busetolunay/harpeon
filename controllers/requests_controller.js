const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const {getRequestService, postRequestService,getRequestsService,acceptRequestService,deleteRequestService} = require("../services/requestsService")

// hata vermedi ama calistigindan emin olamadim
const getRequests = async (req,res)=>{
  const currentUserId=req.user.id
  const response= await getRequestsService(currentUserId, res)
    if(response.status != 200){
      res.status(response.status).json(response.message)
    }
    res.status(response.status).json(response.data);
};


const getRequest = async (req,res)=>{
    const response= await getRequestService(req, res)
    if(response.status != 200){
      res.status(response.status).json(response.message)
    }
    res.status(response.status).json(response.data)
};


const postRequest = async (req, res) => {
   const response= await postRequestService(req, res)
   res.status(response.status).json(response.message)
  };


const deleteRequest = async(req,res)=>{
  const response= await deleteRequestService(req, res)
  res.status(response.status).json(response.message)
};


const acceptRequest = async (req,res)=>{
  const response= await acceptRequestService(req, res)
  res.status(response.status).json(response.message)
};


module.exports=
{
    getRequest,
    getRequests,
    postRequest,
    deleteRequest,
    acceptRequest
}