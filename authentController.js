//const express = require('express')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./userModel');
const catchAsync = require('./catchAsync');
const AppError = require('./AppError');
const { response } = require('express');

//mongoose.set('serverSelectionTimeoutMS', 20000);

const JWT_SECRET = 'my_long_jwt_secret_that_i_though'
const JWT_EXPIRES_IN = '90d'
const signToken = id=> {
    return jwt.sign({id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
}
exports.signup = async (req, res, next) => {
     try {
         const newUser = await User.create({
             name: req.body.name,
             email: req.body.email,
             password: req.body.password,
             passwordConfirm: req.body.passwordConfirm
         });
         const token = signToken(User._id)
       //  console.log(token);
         //console.log(process.env.JWT_SECRET)
         res.status(201).json({
             status: 'sucess',
             token,
             data: {
                 user: newUser
             }
         });
     } catch (error) {
         res.status(400).json({
             status: 'fail',
             message: error.message
         });
         console.log(error);
     }
    //console.log(req.body);
    //res.status(200).json({
      //  messgae:'success'
    //})
    next()
};

exports.login = async(req, res, next)=>{
    const {email, password} = req.body;

    //1. checking if the email $password is valid
    if(!email || !password)
    return next(new AppError('please enter valid email and password'));
    //2.cheking if user is valid
    const user = await User.findOne({email}).select('+password');
    //const correct = await user.correctPassword(candidatePassword, user.password);

    let candidatePassword = req.body.password;

    if(!user || !(await user.correctPassword(candidatePassword, user.password))){
        return next(new AppError('incorrect email or password'))
    }

    //3.if everything is oky send token to client
    const Token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        Token
    });
};
