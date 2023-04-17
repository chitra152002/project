const mongoose =require('mongoose')
const Schema = mongoose.Schema
const Joi = require("joi");
const UserDetailSchema = new Schema({
    Username:{
        type: String,
        unique: true
    },
    Name:{
        type: String
    },
    Email:{
        type: String
    },
    Phone:{
        type: Number
    },
    Password:{
        type: String
    }
},{timestamps: true})

const UserDetails = mongoose.model('UserDetails',UserDetailSchema)

module.exports = UserDetails