const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName:{
        type:String,
        require:[true,'ad alanı boş olamaz'],
        trim:true,
        minLength:2,
        maxLength:30
    },email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
},{Collection:"Kullanicilar",timestamps:true});
const User = mongoose.model('User',userSchema);

module.exports=User;