import { Router } from 'express';
import { 
    listPosts, 
    getPost, 
    addPost, 
    editPost, 
    removePost,
    addTagToPostController,
    removeTagFromPostController,
    publishPostController,
    unpublishPostController,
    getPostStats
} from '../controllers/postController.js';

const router = Router();

// Temel post işlemleri
router.get('/', listPosts);
router.get('/stats', getPostStats);
router.get('/:id', getPost);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', removePost);

// Yayınlama işlemleri
router.put('/:id/publish', publishPostController);
router.put('/:id/unpublish', unpublishPostController);

// Etiket işlemleri
router.post('/:postId/tags/:tagId', addTagToPostController);
router.delete('/:postId/tags/:tagId', removeTagFromPostController);

export default router;