const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const Rating = require('../models/rating');


const getRequestService = async (req, res) => {
    const  requestId  = req.params.requestId;
    const currentUserId=req.user.id;  // we need auth req.user._id
  try{    
    const request= await Request.findById(requestId  ); 
    if(!request){
        return{status:404, message: 'Request not found' }
    }
    console.log(request)
    if(request.lawyerId.toString() !==currentUserId)  {
    return{status:404, message: 'This request is not yours' };
    }
    const data=request
    return {status:200,data}
  }catch(error){
    console.log(error)
    return{status:500, message: 'Internal server error' };
  }    
};


const postRequestService= async (req,res)=>{
    const { lawyerId, message, startDate, endDate } = req.body; // blocks of entry
    try {
      const lawyer = await Lawyer.findById(lawyerId);
      if (!lawyer) {
        return {status:404, message: 'Lawyer not found' };
      }
      const reserved=await Reservation.findOne({
        lawyerId,
        $or: [
          { startDate: { $lt: startDate }, endDate: { $gt: startDate } },
          { startDate: { $lt: endDate }, endDate: { $gt: endDate } },
          { startDate: { $gte: startDate }, endDate: { $lte: endDate } },
        ],
      });
      if(reserved){
        return {status:404,message: 'Lawyer is not available during this period'}
      }
        const newRequest = new Request (  {
        lawyerId,
        userId:req.user.id, // we need auth
        startDate:startDate ,
        endDate:endDate,  
        message: message                  })  ;
        
      await newRequest.save();
     return {status:200,message:"success"}; // Redirect to the homepage, for example

    } catch (error) {
        return {status:500,message:'Internal server error' };
    }
  }
const getRequestsService= async (currentUserId,res)=>{
  try{
    const requests= await Request.find({lawyerId:currentUserId}); //what is wrong here
    //console.log(await Request.find())
  if(requests.length===0 ){ 
    return  {status:404,message:'There are no requests'}  
    }
     const data=requests 
    return {status:200,data};
  } catch{
    return {status:404,message: 'Internal server error' };
  }
}


const acceptRequestService= async (req,res)=>{
    const { userId,lawyerId, message, startDate, endDate } = req.body;
    const currentUserId=req.user.id         // we need auth
    const request= await Request.find(
        { lawyerId:currentUserId,
        startDate:startDate ,
        endDate:endDate,  
        message: message
     }); 
    if(!request ){
         return {status:404,message: 'There are no requests'}    
        }
    const newReservation = new Reservation({
        userId: userId, // Assuming user data is available after authorization
        lawyerId:req.user.id,
        message:message,
        startDate:startDate,
        endDate:endDate,
      });
  
      await newReservation.save();
      return {status:200,message: 'success'}  
}


const deleteRequestService= async (req,res)=>{
    try{
    const requestId=req.params.requestId
    const currentUserId=req.user.id         
    console.log(currentUserId)
    const request= await Request.findById(requestId);
    console.log(request.lawyerId)
     if(!request){
        return {status:404,message: 'No such request'}
    }
    if( request.lawyerId.toString()!== currentUserId){
        return {status:404,message: 'This request is not yours'}
    }
    await Request.findByIdAndDelete(requestId);
    return {status:200,message: 'success'}   }
    catch(error){
        console.log(error)
        return {status:500,message: 'server error'}
    }
}



module.exports={
    getRequestService,
  getRequestsService,
    postRequestService,
  deleteRequestService,
   acceptRequestService
}