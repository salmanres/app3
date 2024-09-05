'Access-Control-Allow-Origin'
const express = require("express");
const appRoutes = express.Router();
const newUser = require("../schemas/NewUserSchema");
const pickupdrop = require("../schemas/PickupDropSchema");
const addnewcar = require("../schemas/VehicleDetailsSchema");
const jwt = require('jsonwebtoken');
const verifyToken = require("../middleware/auth.js");
const seckey = "your_secret_key";
const Razorpay = require("razorpay");
const ticket = require("../schemas/TicketSchema.js");
require('dotenv').config();
const newDriver = require("../schemas/NewDriverSchema.js");
const newRoute = require("../schemas/NewRouteSchema.js");

//welcome page API  ----------------

appRoutes.get("/", (req, res) => {
    res.send("weclome");
});

//registration API----------------

appRoutes.post("/register", async (req, res) => {
    const { name, mobile, password } = req.body;
    if (name.length != 0 && name.length != 30 && password.length != 0 && mobile.length != 0) {
        try {
            const newUserData = new newUser({ name, mobile, password });
            await newUserData.save();
            console.log(newUserData);
            res.status(200).json({ message: "registration successful, please login!" });
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: "mobile number already registered, please login!" });
            } else {
                res.status(500).json({ message: "internal server error!" });
            }
        }
    } else {
        res.status(450).json({ message: "please fill all details first!" });
    }
});

//login API & JWT Token-------------------------

appRoutes.post("/login", async (req, res) => {
    const { mobile, password } = req.body;
    try {
        const userData = await newUser.findOne({ mobile });
        if (userData && userData.password === password) {
            const fullname = userData.name;
            const mobile = userData.mobile;
            const payload = { id: userData._id, name: fullname };
            const token = jwt.sign(payload, seckey, { expiresIn: "1d" });

            res.status(200).json({ message: "login successful!", name: fullname, mobile: mobile, token });
        } else {
            res.status(500).json({ message: "invalid username/password" });
        }
    } catch (error) {
        res.status(400).json({ message: "internal server error" });
    }
});


//pickup and drop API ----------------

appRoutes.get("/location", async (req, res) => {
    try {
        const locationData = await pickupdrop.find();
        res.send(locationData);
    } catch (error) {
        res.status(450).json({ message: "internal server error!" });
    }
});

//add new car API ----------------

appRoutes.post("/addnewcar", async (req, res) => {
    const { registration, model, make, color, ownername, ownernumber, drivername, drivernumber, departureplace, departuretime } = req.body;
    try {
        const existingcar = await addnewcar.findOne({ registration });
        if (!registration || !model || !make || !color || !ownername || !ownernumber || !drivername || !drivernumber) {
            return res.status(400).json({ message: "please fill all details!" });
        }
        if (existingcar) {
            res.status(450).json({ message: "vehicle already registered!" });
        } else {
            let cardata = await addnewcar({ registration, model, make, color, ownername, ownernumber, drivername, drivernumber, departureplace, departuretime });
            cardata.save();
            console.log(cardata);
            res.status(200).json({ message: "vehicle registered succesfully!" });
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error!" });
    };
})

//available cars API ----------------

appRoutes.get("/availablecars", verifyToken, async (req, res) => {
    try {
        const carData = await addnewcar.find();
        res.send(carData);
    } catch (error) {
        res.status(350).json({ message: "internal server error!" });
    }
});


// Razorpay API ----------------

appRoutes.post("/orders", async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    })
    const options = {
        amount: req.body.amount,
        currency: "INR",
        payment_capture: 1
    }
    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error", error });
    }
});



appRoutes.get("/payment/:paymentId", async (req, res) => {
    const { paymentId } = req.params;
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    })
    try {
        const payment = await razorpay.payments.fetch(paymentId);
        if (!payment) {
            res.status(360).json({ message: "invalid payment ID" });
        } else {
            res.json({
                status: payment.status,
                method: payment.method,
                amount: payment.amount,
                currency: payment.currency
            });
        }
    } catch (error) {
        console.log(error);
        res.status(460).json({ message: "internal error", error });
    }
});

// ticket api ................

appRoutes.post("/saveticket", async (req, res) => {
    const {
        username,
        mobile,
        pickup,
        drop,
        seats,
        date,
        model,
        registration,
        drivername,
        drivernumber,
        route,
        departuretime,
        fare,
        paymentId,
    } = req.body;
    try {
        const ticketData = new ticket({
            username,
            mobile,
            pickup,
            drop,
            seats,
            model,
            registration,
            drivername,
            drivernumber,
            route,
            departuretime,
            fare,
            paymentId,
        });
        await ticketData.save();
        res.status(200).json({ message: "ticket saved successfully" });
    } catch (error) {
        res.status(400).json({ message: "internal server error", error });
    };
});


appRoutes.get("/myticket", async (req, res) => {
    const { mobile } = req.query;
    try {
        const response = await ticket.find({ mobile: mobile, ridestatus: "ongoing" });
        res.send(response);
        console.log(response);
    } catch (error) {
        res.status(350).json({ message: "no booking available!", error });
    }
});

appRoutes.get("/myhistory", async (req, res) => {
    const { mobile } = req.query;
    try {
        const response = await ticket.find({ mobile: mobile, ridestatus: "completed" });
        res.send(response);
        console.log(response);
    } catch (error) {
        res.status(350).json({ message: "no booking available!", error });
    }
});

appRoutes.get("/getticketdata/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await ticket.findById(id);
        res.send(response);
    } catch (error) {
        res.status(330).json({ message: "internal server error", error });
    }
});

appRoutes.patch("/modifyticket/:id", async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        console.log(req.body);
        const response = await ticket.findByIdAndUpdate(id, req.body, { new: true });
        res.send(response);
    } catch (error) {
        res.status(330).json({ message: "internal server error", error });
    }
});


// Driver End APIs ...............

appRoutes.get("/mybookings", async (req, res) => {
    try {
        const response = await ticket.find({ ridestatus: "ongoing" });
        res.send(response);
    } catch (error) {
        res.status(340).json({ message: "internal server error", error });
    }
});

appRoutes.patch("/completebooking/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await ticket.findByIdAndUpdate(id, { ridestatus: "completed" });
        res.send(response);
        console.log(response);
    } catch (error) {
        res.status(340).json({ message: "internal server error", error });
    }
});

appRoutes.post("/driverlogin", async (req, res) => {
    const { drivernumber, driverpassword } = req.body;
    if (!drivernumber || !driverpassword) {
        return res.status(400).json({ message: "please fill all details!" });
    }
    try {
        const data = await newDriver.findOne({ drivernumber });
        if (!data) {
            return res.status(404).json({ message: "Driver not found! Please register first." });
        }
        if (data.driverpassword === driverpassword && data.drivernumber === drivernumber) {
            return res.status(200).json({ message: "login successful!" });
        } else {
            return res.status(401).json({ message: "Invalid credentials. Please try again!" });
        }
    } catch (error) {
        res.status(450).json({ message: "internal server error", error });
    }
});


// admin side apis ................


appRoutes.post("/addnewdriver", async (req, res) => {
    const {
        drivername, drivernumber, driverlicence, driveraadhar, driveraddress, driverpassword
    } = req.body;

    try {
        const data = await newDriver.findOne({ driverlicence });
        if (data) {
            return res.status(409).json({ message: "Driver already registered! Please login." });
        }
        if (!drivername || !drivernumber || !driverlicence || !driveraadhar || !driverpassword || driveraddress) {
            return res.status(400).json({ message: "please fill all details!" });
        }
        const response = await newDriver.create({
            drivername, drivernumber, driverlicence, driveraddress, driveraadhar, driverpassword
        });
        res.status(201).json({ message: "Driver added successfully" });
        console.log(response);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

appRoutes.post("/addnewroute", async (req, res) => {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
        return res.status(400).json({ message: "Please fill all details!" }); // Changed 450 to 400
    }
    try {
        const response = await newRoute.create({ origin, destination });
        res.status(200).json({ message: "Route added successfully!" });
        console.log(response);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error }); // Changed 400 to 500 for server error
    }
});

appRoutes.get("/getdriverdata", async (req, res) => {
    const { drivername } = req.body;
    try {
        const response = await newDriver.find({});
        res.send(response);
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error });
    }
});

appRoutes.get("/getsingledriverdata/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await newDriver.findById(id);
        res.send(response);
    } catch (error) {
        res.status(500).json({ message: "internal server error", error });
    }
});

appRoutes.patch("/blacklistdriver/:id", async (req, res) => {
    const { id } = req.params;
    const { blacklisted } = req.body;
    try {
        const response = await newDriver.findByIdAndUpdate(id, { blacklisted });
        res.send(response);
    } catch (error) {
        res.status(500).json({ message: "internal server error", error });
    }
});

appRoutes.get("/cardata", async (req, res) => {
    const { registration } = req.query;
    try {
        const response = await addnewcar.find({ registration: new RegExp(registration, 'i') });
        if (response.length > 0) {
            res.send(response);
        } else {
            res.status(404).json({ message: "Vehicle not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});



module.exports = appRoutes;