import { Router } from 'express';
import { 
    listPosts, 
    getPost, 
    addPost, 
    editPost, 
    removePost,
    addTagToPostController,
    removeTagFromPostController 
} from '../controllers/postController.js';

const router = Router();

// Temel post işlemleri
router.get('/', listPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', removePost);

// Etiket işlemleri
router.post('/:postId/tags/:tagId', addTagToPostController);
router.delete('/:postId/tags/:tagId', removeTagFromPostController);

export default router;