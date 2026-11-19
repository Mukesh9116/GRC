const mongoose = require('mongoose')
const mongoDB = require('../config/db')

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true 
    } ,
    email : {
        type : String,
        required : true 
    } ,
    password : {
        type : String,
        required : true 
    },
},
    {
        timestamps : true
    }
)

module.exports = mongoose.model("Admin" , adminSchema)