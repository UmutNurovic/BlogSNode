
const Category = require('../models/categories');
const Post = require('../models/post');
const path = require('path');


const GetCategories = (req,res)=>{
    Category.find({}).lean().sort({$natural:-1}).then(categories=>{
        res.render('admin/categories',{categories:categories})
    });
}

const PostCategories = (req,res)=>{
    Category.create(req.body,(error,category)=>{
        if(!error){
            res.redirect('categories');
        }
    });
}

const  DeleteCategories = (req,res)=>{
    Category.remove({ _id : req.params.id }).then(()=>{
      res.redirect('/admin/categories');
    });
  }

const GetPosts = (req,res)=>{
    Post.find({}).lean().sort({$natural:-1}).populate({path:'category',model:Category}).then(posts=>{
        
            res.render('admin/posts',{posts:posts});
       
    });
}

const DeletePostWithId =(req,res)=>{
    Post.remove({ _id : req.params.id }).then(()=>{
      res.redirect('/admin/posts');
    });
  }

  const GetEditPostWithId = (req,res)=>{
    Post.findOne({_id:req.params.id}).lean().then(post =>{
        Category.find({}).then(categories=>{
            res.render('admin/editPost',{post:post, categories:categories.map(item => item.toJSON())});
        })
    });
}

const PutPostWithId = (req,res)=>{
    let post_image = req.files.post_image;
    post_image.mv(path.resolve(__dirname,'../public/img/postimages',post_image.name));
    Post.findOne({_id:req.params.id}).then(post=>{
        post.title = req.body.title;
        post.content = req.body.content;
        post.date = req.body.date;
        post.category = req.body.category;
        post.post_image =`/img/postimages/${post_image.name}`;
        post.save().then(post=>{
            res.redirect('/admin/posts');
        })
    });
}

module.exports = {
    GetCategories,
    PostCategories,
    DeleteCategories,
    GetPosts,
    DeletePostWithId,
    GetEditPostWithId,
    PutPostWithId
    

}