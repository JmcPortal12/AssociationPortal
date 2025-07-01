const express = require('express')
const mongoose = require('mongoose')
const router = express()

const loginSchema = new mongoose.Schema({
    username :{
        type:String,
        required :true
    },
    password :{
        type :String,
        required :true
    }
})

module.exports = mongoose.model('Login',loginSchema)