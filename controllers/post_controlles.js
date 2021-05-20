
const Post = require('../models/post');
const User = require('../models/user_models');
const Category = require('../models/categories');
const path = require('path');


const getCategory = (req,res)=>{
    if(!req.session.passport){
       return  res.render('site/login');
    }
    Category.find({}).then(categoris=>{
        res.render('site/addPost',{categoris:categoris.map(item => item.toJSON())
        });
    })
        

}

const AddPost = (req,res)=>{
    let post_image = req.files.post_image;
    post_image.mv(path.resolve(__dirname,'../public/img/postimages',post_image.name));
    Post.create({
        ...req.body,
        post_image:`/img/postimages/${post_image.name}`,
        author:req.session.passport.user
    });

    req.session.sessionFlash = {
        type:'alert alert-success',
        message:'postunuz başarılı bir şekilde eklendi'
    }
    res.redirect('/blog');
 }

 const SendById =(req,res)=>{
    Post.findById(req.params.id).lean().populate({path:'author',model:User}).then(post=>{
        Category.find({}).lean().then(categories=>{
            Post.find({}).sort({$natural:-1}).populate({path:'author',model:User}).lean().then(posts=>{
                res.render('site/posts',{
                    post:post,
                    categories:categories,
                    posts:posts
                });
            });
        })

    });

}

module.exports = {
    getCategory,
    AddPost,
    SendById
}