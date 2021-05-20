const router = require('express').Router();
const post_controller = require('../controllers/post_controlles');


router.get('/new',post_controller.getCategory);

router.post('/new',post_controller.AddPost);


router.get('/:id',post_controller.SendById);

module.exports= router;