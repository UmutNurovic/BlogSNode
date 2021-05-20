const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type:String,
        require:true,
    },content:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now
    },post_image:{
        type:String,
        require:true,
    },
    author:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    category: {
        type:Schema.Types.ObjectId,ref:'categories'
    }
},{Collection:"Kullanicilar",timestamps:true});
const Posts = mongoose.model('Post',postSchema);

module.exports=Posts;