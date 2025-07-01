const express = require('express')
const mongoose = require('mongoose')


const teacherSchema = new mongoose.Schema({
     role:{
        type:String,
        required :true
    },
    name:{
        type :String,
        required :true
    },
    course:{
        type:String,
        required :true
    },
    type:{
        type:String,
        required :true
    },
    department:{
        type:String,
        required :true
    },staff:{
        type:String,
        required :true
    }
    ,
    lecture:{
        type:String,
        required :true
    },
    empId:{
        type:String,
        required :true
    },
    dob:{
        type:Date,
        required :true
    },
    email:{
        type:String,
        required :true
    },
    phoneNo:{
        type:String,
        required :true
    },
    address:{
        type:String,
        required :true
    },
    file :{
        type :String,
        required:true
    }
    
})

module.exports = mongoose.model('Teacher',teacherSchema)