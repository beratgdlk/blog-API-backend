import express from 'express';
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

const router = express.Router();

router.get('/', listPosts as express.RequestHandler);
router.get('/stats', getPostStats as express.RequestHandler);
router.get('/:id', getPost as express.RequestHandler);
router.post('/', addPost as express.RequestHandler);
router.patch('/:id', editPost as express.RequestHandler);
router.delete('/:id', removePost as express.RequestHandler);

router.patch('/:id/publish', publishPostController as express.RequestHandler);
router.patch('/:id/unpublish', unpublishPostController as express.RequestHandler);

router.post('/:postId/tags/:tagId', addTagToPostController as express.RequestHandler);
router.delete('/:postId/tags/:tagId', removeTagFromPostController as express.RequestHandler);

export default router;