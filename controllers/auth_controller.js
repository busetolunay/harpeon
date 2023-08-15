const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Lawyer = require('../models/lawyer');
const {registerService,loginService}= require("../services/authService")

const register = async (req, res) => {
  const reqbody = req.body;
  const response= await registerService(reqbody, res)
  res.status(response.status).json(response.message)
}

const login= async (req, res)=>{
    const reqbody = req.body;
    const response= await loginService(reqbody, res)
    if(response.status != 200){
        res.status(response.status).json(response.message)
      }
      res.status(response.status).json(response.data);
 }

 const logout = (req, res) => {
   res.clearCookie('token'); 
   res.status(200).json({message:'logged out' });
};

module.exports = {
  register,
  login,
  logout,
};
