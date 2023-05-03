
const mongoose = require("mongoose");
require('dotenv').config();

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.ftniq.mongodb.net/portfolioDB`;

const connectionParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

const connectDB = () => {
   mongoose.connect(uri, connectionParams).then(()=>{
    console.log("connected succesfully to the database");
   })
   .catch(err=>{
    console.log("connection failed: ",err);
   })
}

module.exports = connectDB;


