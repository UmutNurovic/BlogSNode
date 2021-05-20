const User = require('../models/user_models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
//const {validationResult} = require('express-validator');

require('../config/password_loca')(passport);
const getLoginPage =(req,res)=>{
    res.render('site/login');
}
const login = async(req,res,next)=>{
    req.session.passport= req.body._id;
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
}

const register = async (req,res)=>{

   try {
       const _user = await User.findOne({email:req.body.email});
       if(_user){
           console.log("bu mail kullanımda");
       }else if(!_user){
        const newUser = new User({
            userName:req.body.userName,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password,10)
        });
        req.session.sessionFlash = {
            type:'alert alert-success',
            message:'postunuz başarılı bir şekilde eklendi'
        }
        await newUser.save();     
        res.redirect('/login');
       }
   } catch (err) {
       console.log(err);
   }
}


const getRegisterPage = (req,res)=>{
    res.render('site/register');
}

module.exports={
    getLoginPage,
    login,
    getRegisterPage,
    register
}