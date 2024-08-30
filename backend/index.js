'Access-Control-Allow-Origin'
const express = require("express");
const app = express();
const appRoutes = require("./routes/AppRoute");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./database/Connection");
require("dotenv").config();
const port = process.env.PORT || 3400;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(appRoutes);

app.listen(port, (req, res)=>{
    console.log(`app is running on port ${port}`);
})