const router = require('express').Router();
const admin_controller = require('../../controllers/admin_controller');

router.get('/categories',admin_controller.GetCategories);
router.post('/categories',admin_controller.PostCategories);
router.delete('/categories/:id',admin_controller.DeleteCategories);




router.get('/posts',admin_controller.GetPosts);
router.delete('/posts/:id',admin_controller.DeletePostWithId);
router.get('/posts/edit/:id',admin_controller.GetEditPostWithId);
router.put('/posts/:id',admin_controller.PutPostWithId);
module.exports=router;