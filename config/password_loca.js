const LocalStrategy = require('passport-local');
const User = require('../models/user_models');
const bcrypt = require('bcrypt');


module.exports=function(passport){
    const option = {
        usernameField:'email',
        passwordField:'password',
    };
    passport.use(new LocalStrategy(option,async(email,passwords,done)=>{
        try {
            const _bulunanUser = await User.findOne({email:email});
            if(!_bulunanUser){
                return done(null,false,console.log('user yok'));
            }
            const passwordControl = await bcrypt.compare(passwords,_bulunanUser.password);
            if(!passwordControl){
                return done(null,false,console.log('sifre hatalı'));
            }else{
                return done(null,_bulunanUser);
            }
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    
    passport.deserializeUser(function(id,done){
       
        User.findById(id,function(err,user){
            const yeniUser = {
                email:user.email,userName:user.userName,id:user.id
            }
            done(err,yeniUser);
    });
        
    });

}