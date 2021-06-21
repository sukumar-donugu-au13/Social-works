require('dotenv').config();

const mongoose = require('mongoose');

function connectDB() {
    //DB connection
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify : true,}).then(()=>{
            console.log('`Connection Successfull');
        }).catch((err)=>{
            console.log("connection to database failed!");
        });
}
module.exports = connectDB;
