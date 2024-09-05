const mongoose = require("mongoose");

const newRouteSchema = new mongoose.Schema({
    origin: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    },
});

const newRoute = new mongoose.model("route", newRouteSchema);
module.exports = newRoute;