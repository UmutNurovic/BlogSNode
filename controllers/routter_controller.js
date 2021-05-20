const auth_controller = require('../controllers/auth_controller');
const Post = require('../models/post');
const User = require('../models/user_models');
const Category = require('../models/categories');



const getBlog = (req,res)=>{
   
    Post.find({}).lean().sort({$natural:-1}).populate({path:'author',model:User}).then(posts=>{
        Category.find({}).then(categories=>{
            res.render('site/blog',{posts:posts, categories:categories.map(item => item.toJSON())
            });
        });
       
    });
}

const getContactPage=(req,res)=>{
    res.render('site/contact');
}

const Logout =(req,res)=>{
    req.session.destroy(()=>{
        res.render('/');
    });
}

module.exports = {
    getBlog,getContactPage,
    Logout
}