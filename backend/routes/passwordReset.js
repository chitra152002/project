const UserDetails = require('../models/UserDetails')
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) 
        return res.json({
            message: error.details[0].message
        });

        const user = await UserDetails.findOne({ Email: req.body.email });
        
        if (!user)
            return res.json({
                message: "User with given Email doesn't exist!"
            });

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `Thank You for using Clickology. We would like to inform that your Password is "${user.Password}".`;
        await sendEmail(user.Email, "Clickology Password", link);
        res.json({
            message: 'Password sent to your email account'
        })
    } catch (error) {
        res.json({
            message: 'An error occured. Contact the Organisation Admin.'
        });
        console.log(error);
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ Password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await UserDetails.findById(req.params.userId);
        if (!user) return res.status(400).send("Invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.Password = req.body.password;
        await user.save();
        await Token.findOneAndRemove({
            userId: user._id,
            token: req.params.token
        });

        res.send("Password reset sucessfully.");
    } catch (error) {
        res.send("An error occured. Contact the Organisation Admin.");
        console.log(error);
    }
});

module.exports = router;