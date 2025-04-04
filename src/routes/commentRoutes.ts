import { Router } from 'express';
import { 
    listComments, 
    getComment, 
    addComment, 
    editComment, 
    removeComment,
    getPostComments,
    getCommentStats
} from '../controllers/commentController.js';

const router = Router();

// Temel yorum işlemleri
router.get('/', listComments);
router.get('/stats', getCommentStats);
router.get('/:id', getComment);
router.post('/', addComment);
router.put('/:id', editComment);
router.delete('/:id', removeComment);

// Yazıya ait yorumları getir
router.get('/post/:postId', getPostComments);

export default router;
