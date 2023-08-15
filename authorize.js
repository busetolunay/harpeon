const authorize= (req,res,next)=>{
    const {user}=req.query;
    if(user === ''){
        req.user ={name:'',id :2}
    }else{
        res.status(401).send('Unauthorize')
    }
    console.log('authorize')
    next()
}
module.exports= authorize