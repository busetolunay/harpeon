const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Reservation=require('../models/reservation')
const Lawyer=require('../models/lawyer')
const City=require('../models/city')
const Bar=require('../models/bar')
const Request = require('../models/request');
const Rating = require('../models/rating');


const jwtSecretKey = process.env.JWT_SECRET_KEY 

const generateToken = (id) => {
    console.log(jwtSecretKey)
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: '1h' });
};

const registerService = async (reqbody, res) => {
  try{
    const {name, email,password,phone,barId }= reqbody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newLawyer = new Lawyer({
      name,
      email,
      password: hashedPassword,
      phone,
      barId
    });
    await newLawyer.save();
    return {status:201,message:'success'};
  } catch (error) {
    console.log("fcgvhbj")
    return {status:500,message:'Registration failed'};
  }
}
const loginService= async (reqbody,res)=>{
    try {
      const {email,password }= reqbody;
      const lawyer = await Lawyer.findOne({email:email});
      if (!lawyer || !(await bcrypt.compare(password,lawyer.password))) {
        return res.status(401).json({error:'invalid email or password' });  }
      const token = generateToken(lawyer._id);
      const data=token
     return {status:200,data};
    } catch (error) {
      console.log(error)
      return {status:500,message:'Login failed'};
    }
  }

module.exports={registerService,loginService}