const { response } = require('express')
const UserDetails = require('../models/UserDetails')

//Show the list of User Details
const index = (req, res, next) => {
    UserDetails.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

//Show single User Details
const show = (req, res, next) => {
    UserDetails.find({ Username: req.body.Username })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

//Add New User Details
const store = (req, res, next) => {

    let UserDetail = new UserDetails({
        Username: req.body.Username,
        Email: req.body.Email,
        Name: req.body.Name,
        Phone: req.body.Phone,
        Password: req.body.Password,
    })
    UserDetail.save()
        .then(() => {
            res.json({
                message: 'User Details Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

//Update Existing Employee
const update = (req, res, next) => {
    let UserDetailID = req.body.UserDetailID
    let updateData = {
        Username: req.body.Username,
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Password: req.body.Password,
    }
    UserDetails.findByIdAndUpdate(UserDetailID, { $set: updateData })
        .then(() => {
            res.json({
                message: 'User Details Updated Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

//User Login
const login = (req, res, next) => {
    let UsernameData = req.body.Username
    let PasswordData = req.body.Password
    UserDetails.findOne({
        $and: [
            { Username: req.body.Username }, { Password: req.body.Password }]
    })
        .then(response => {
            if (response != null) {
                res.json({
                    message: 'Logged in Successfully.'
                })
            }
            else if(response == null){
                res.json({
                    message: 'User do not exists.'
                })
            }
            
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}
const checkUserExists = (req, res, next) => {
    let UsernameData = req.body.Username
    UserDetails.findOne({
        $and: [{ Username: req.body.Username }]
    })
        .then(response => {
            if (response != null) {
                res.json({
                    message: 'User Exists.'
                })
            }
            else if(response == null){
                res.json({
                    message: 'User do not exists.'
                })
            }
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

//delete an User Details
const destroy = (req, res, next) => {
    let UserDetailID = req.body.UserDetailID
    UserDetails.findOneAndRemove(UserDetailID)
        .then(() => {
            res.json({
                message: 'User Details Deleted Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

module.exports = {
    index, show, store, update, destroy, login, checkUserExists
}