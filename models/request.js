const mongoose =require('mongoose');

const requestSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
    lawyerId:{type:mongoose.Schema.Types.ObjectId, ref: 'Lawyer',required:true},
    message:{type:String, required: true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
})

module.exports = mongoose.model('Request',requestSchema);