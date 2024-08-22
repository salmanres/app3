const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    mobile :{
        type:String,
        required:true
    },
    pickup :{
        type:String,
        required:true
    },
    drop :{
        type:String,
        required:true
    },
    seats :{
        type:number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time :{
        type:String,
        required:true
    }
});