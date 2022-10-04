import { Router } from 'express';

const router = Router();
const post = require('../controllers/post');

router.post('/', post.createPost);
router.get('/list/:category', post.getList);
router.get('/:postId', post.getPost);
router.put('/:postId', post.updatePost);
router.delete('/:postId', post.deletePost);

module.exports = router;
