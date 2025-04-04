import express from 'express';
import { 
    listComments, 
    getComment, 
    addComment, 
    editComment, 
    removeComment,
    getPostComments,
    getCommentStats
} from '../controllers/commentController.js';

const router = express.Router();

router.get('/', listComments as express.RequestHandler);
router.get('/stats', getCommentStats as express.RequestHandler);
router.get('/:id', getComment as express.RequestHandler);
router.post('/', addComment as express.RequestHandler);
router.patch('/:id', editComment as express.RequestHandler);
router.delete('/:id', removeComment as express.RequestHandler);

router.get('/post/:postId', getPostComments as express.RequestHandler);

export default router;
