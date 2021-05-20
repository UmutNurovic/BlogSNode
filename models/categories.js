const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
},{Collection:"Kullanicilar",timestamps:true});
const categories = mongoose.model('categories',categorySchema);

module.exports=categories;