'Access-Control-Allow-Origin'
const express = require("express");
const appRoutes = express.Router();
const newUser = require("../schemas/NewUserSchema");
const pickupdrop = require("../schemas/PickupDropSchema");
const addnewcar = require("../schemas/VehicleDetailsSchema");


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

//login API-------------------------

appRoutes.post("/login", async (req, res) => {
    const { mobile, password } = req.body;
    try {
        const userData = await newUser.findOne({ mobile });
        if (userData && userData.password === password) {
            res.status(200).json({ message: "login successful!" });
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

appRoutes.get("/availablecars", async (req, res)=>{
    try{
        const carData = await addnewcar.find();
        res.send(carData);
    }catch(error){
        res.status(350).json({message:"internal server error!"});
    }
});


module.exports = appRoutes;