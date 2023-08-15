const jwt=require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
  console.log("auth middleware")
  const token = req.header('Authorization');
  if (req.path === '/auth/register' || req.path === '/auth/login') {  next();
  } else{
  if (!token) {
    return res.status(401).json({error:'Authorization token missing' });
  }
  try {
    const decoded= jwt.verify(token, jwtSecretKey);
    req.user =decoded; 
    next();//devam
  } catch (error) {
    return res.status(401).json({error:'Invalid token or token expired' });
  }
}
};


module.exports = authMiddleware;
