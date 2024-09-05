const mongoose = require("mongoose");

const newDriverSchema = new mongoose.Schema({
    drivername: {
        type: String,
        require: true
    },
    drivernumber: {
        type: String,
        require: true,
        unique: true
    },
    driverlicence:{
        type: String,
        require: true,
        unique: true
    },
    driveraadhar: {
      type: String,
      require: true,
      unique: true  
    },
    driveraddress:{
        type: String,
        require: true   
    },
    driverpassword: {
        type: String,
        require: true
    },
    driverRegDate: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 5);
            now.setMinutes(now.getMinutes() + 30);
            return now;
        }
    },
    blacklisted: {
        type: Boolean,
        default: false
    },
})

const newDriver = new mongoose.model("newdriver", newDriverSchema);
module.exports = newDriver;