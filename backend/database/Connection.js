const mongoose = require("mongoose");
require("dotenv").config();
const dbKey = encodeURIComponent(process.env.DB_KEY);

const db = `mongodb+srv://zebsoft:${dbKey}@zebsoft.iyoy4go.mongodb.net/cabdata`;

mongoose.connect(db).then(()=>{
    console.log("database connected!");
});