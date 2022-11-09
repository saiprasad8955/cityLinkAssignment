const mongoose = require('mongoose') 

const user = new mongoose.Schema({

    id : {
        type: Number,
        required:true,  
        index:true,
        unique:true
    },
    fullName : {
        type:String,
        required:true,
        trim:true
    },
    mobile: {   
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    email : {
        type: String,
        required:true,
        unique:true,
        trim:true
    }


})


module.exports = mongoose.model("User",user)