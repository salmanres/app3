const mongoose = require("mongoose");

const vehicleDetailsSchema = new mongoose.Schema({
    registration: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    make: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    ownername: {
        type: String,
        required: true,
        trim: true
    },
    ownernumber: {
        type: String,
        required: true,
    },
    drivername: {
        type: String,
        required: true,
        trim: true
    },
    drivernumber: {
        type: String,
        required: true,
    },
    regDate: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 5);
            now.setMinutes(now.getMinutes() + 30);
            return now;
        }
    },
    online: {
        type: Boolean,
        default: true
    },
    departureplace: {
        type: String,
        trim: true
    },
    departuretime: {
        type: String,
        trim: true
    },
    documentstatus: {
        type: Boolean,
        default: true
    },
    route: {
        type: String,
        trim: true
    }
});

const vehicleDetail = mongoose.model("vehicledetail", vehicleDetailsSchema);
module.exports = vehicleDetail;