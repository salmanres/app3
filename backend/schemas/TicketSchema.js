const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    drop: {
        type: String,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 5);
            now.setMinutes(now.getMinutes() + 30);
            return now;
        }
    },
    model: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    },
    drivername: {
        type: String,
        required: true
    },
    drivernumber: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    departuretime: {
        type: String,
        required: true
    },
    fare: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        default: true
    },
    ridestatus: {
        type: String,
        enum: ["ongoing", "cancelled", "completed"],
        default: "ongoing"
    }
});


const ticket = new mongoose.model("ticket", ticketSchema);
module.exports = ticket;