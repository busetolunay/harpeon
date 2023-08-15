require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser'); 
const app=express();
app.use(cookieParser());


const authMiddleware = require('./middleware/authMiddleware'); 
app.use(authMiddleware);

const Reservation=require('./models/reservation')
const Lawyer=require('./models/lawyer')
const City=require('./models/city')
const Bar=require('./models/bar')

const dbURI = `mongodb+srv://busetolunay2000:${process.env.PASSWORD}@cluster0.gnvzhlf.mongodb.net/`; // Replace with your actual MongoDB connection string
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true} )
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err)) ;



app.use(express.json());

app.set('view engine', 'ejs');


const authRoutes = require('./routes/auth');
const citiesRoutes = require('./routes/cities');
const lawyersRoutes = require('./routes/lawyers');
const profileRoutes = require('./routes/profile');
const requestsRoutes = require('./routes/requests');
//const locationRoutes = require('./routes/location');

app.use('/auth' , authRoutes);
app.use( '/cities'  , citiesRoutes);
app.use('/lawyers',lawyersRoutes);
app.use( '/profile',profileRoutes);
app.use(   '/requests', requestsRoutes);


app.use((req,res)=>{
    res.sendFile('./views/404.ejs',{root: __dirname})
});


