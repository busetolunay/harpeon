const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const Rating = require('../models/rating');

const getProfileService = async (lawyerId,res)=>{
    try{
        const lawyer=await Lawyer.findById(lawyerId)
        if(!lawyer){
            return {status:404,message:'Lawyer not found'};
        }
        const data= lawyer
        return {status:200, data };
    }catch(error){
        return {status:500, message: 'Internal server error' };
    }
};

const updateProfileService = async (req,res)=>{
    const lawyerId = req.user.id; // Assuming user data is available after authorization
    const { name, email, phone } = req.body;
    try {
      const updatedLawyer = await Lawyer.findByIdAndUpdate(
        lawyerId,
        { name, email, phone },
        { new: true }  )

        const data=updatedLawyer
        return {status:200, data }; // Redirect to the profile page
    } catch (error) {
        return {status:500, message: 'Internal server error' };
    }
}
const deleteProfileService = async (lawyerId,res)=>{
    try{
        const lawyer=await Lawyer.findById(lawyerId)
    if(!lawyer){
        return {status:404,message:'Lawyer not found'};
    }
    await Lawyer.findByIdAndDelete(lawyerId)
    return {status:200,message:'success' };
    }
    catch(error){
        return {status:500, message: 'Internal server error' };
    }
}

module.exports={
getProfileService,
updateProfileService,
deleteProfileService
}