const mongoose = require("mongoose");

const onlineCarSchema = new mongoose.Schema({
    registration: {
        type: String,
        require: true
    },
    make: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    drivername: {
        type: String,
        require: true
    },
    drivernumber: {
        type: String,
        require: true
    },
    carroute: {
        type: String,
        require: true
    },
    departuretime: {
        type: String,
        require: true
    },
    arrivaltime: {
        type: String,
        require: true
    },
    seatsavailable:{
        type: String,
        require: true   
    },
    fare: {
        type: String,
        require: true
    },
    online:{
        type: Boolean,
        default: true
    }
});

const onlinevehicle = new mongoose.model("onlinevehicle", onlineCarSchema);
module.exports = onlinevehicle;