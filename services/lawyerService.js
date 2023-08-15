
const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const Rating = require('../models/rating');


const getLawyersService = async (barId,res)=>{

try {
  const lawyers = await Lawyer.find({
    barId:barId,
    lawyerId:{ $nin:   
      await Reservation.distinct('lawyerId',{
          startDate:{ $lte:new Date()},
          endDate:{ $gte:new Date() },
        })
      }})
      for (const lawyer of lawyers) {
      lawyer.availability=true;
      await lawyer.save();          }   
  if (lawyers.length === 0) {  return res.status(404).json({ error: 'There are no lawyers under this bar' });}
  return lawyers
}catch (error) {
    console.log(error)
    return res.status(500).json({ error:'server error' });    }
};

const getLawyerService = async (lawyerId,res)=>{
    try{  const lawyer= await Lawyer.findById(lawyerId)
        if(! lawyer){return res.status(400).json({message:'Lawyer not found'})}
        const reservationfortoday = await Reservation.find({
            lawyerId: lawyerId ,
            startDate: { $lte: new Date() },
            endDate: { $gte: new Date() },
          });
        if(reservationfortoday) {lawyer.availability=false;} 
        const data = {
            lawyer,reservationfortoday
        }
        return {status: 200, data};
}catch (error) {
    
    return {status: 500,
        message: "server error"};    }
};

const  createRatingService=async (req,res)=>{
    const lawyerId = req.params.lawyerId;
    const { stars, comment } = req.body;
    try {
        const lawyer = await Lawyer.findById(lawyerId);
        if (!lawyer) {return res.status(404).json( { message: 'Lawyer not found' });}
        console.log(req.user)
        const newRating = new Rating({
          userId: req.user.id, //we need auth  userId: req.user._id originally
          lawyerId:lawyerId ,
          stars: stars,
          comment:comment });
        await newRating.save();
        const data=lawyerId
        return {status:200, data}
      } catch (error) {
        console.log(error)
        return {status:500, message: 'Internal server error' };
      }
}

const deleteRatingService = async (req,res)=>{
    const {lawyerId,rateId}= req.params
    const userId = req.user.id;
    console.log('deneme1')
    console.log(rateId)
    try {
      console.log('deneme2')
      const rating =await Rating.findById(rateId)
      console.log(rating)
      if(! rating){ return {status:404, message: 'No comment found with this Id' };}
      if(userId== rating.userId.toString()){
      await Rating.findOneAndDelete({_id:rateId});
      return{status:200 ,lawyerId} // Redirect to the homepage, for example
      }else{ console.log('deneme3')
        return { status :500,message: 'This comment is made by another person' };
      }
    } catch (error) {
      console.log('deneme4')
      console.log(error)
      return { status :500,message: 'Internal server error' };
    }
}
const getRatingService = async (rateId,res)=>{
    try {
      const rating = await Rating.findById(rateId);
      if (!rating) {
        return { status:404, message: 'Rating not found' };
      }
      const data = rating
      return {status :200,data}
    } catch (error) {
      return {status:500, message: 'Internal server error' };
    }
}
module.exports= {getLawyersService,getLawyerService,createRatingService,deleteRatingService,getRatingService};