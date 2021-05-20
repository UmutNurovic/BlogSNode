const router = require('express').Router();
const router_controller = require('../controllers/routter_controller');
const auth_controller = require('../controllers/auth_controller');
const Post = require('../models/post');
const User = require('../models/user_models');
const Category = require('../models/categories');
router.get('/',(req,res)=>{
    console.log(req.session.passport); 
    res.render('site/index');
});

router.get('/admin',(req,res)=>{
    res.render('admin/index');
});

//login
router.get('/login',auth_controller.getLoginPage);
router.post('/login',auth_controller.login);
// contact
router.get('/contact',router_controller.getContactPage);

//register
router.get('/register',auth_controller.getRegisterPage);
router.post('/register',auth_controller.register);

//blog
router.get('/blog',router_controller.getBlog);
//logout
router.get('/logout',router_controller.Logout);



module.exports = router;