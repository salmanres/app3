const mongoose = require("mongoose");

const pickupDropSchema = new mongoose.Schema({
    location:{
        type: String
    }
});

const pickupdrop = new mongoose.model("pickupdrop", pickupDropSchema);
module.exports = pickupdrop;