import { Router } from 'express';
import { listPosts, getPost, addPost, editPost, removePost } from '../controllers/postController.js';

const router = Router();

router.get('/', listPosts)
router.get('/:id', getPost)
router.post('/', addPost)
router.put('/:id', editPost)
router.delete('/:id', removePost)

export default router