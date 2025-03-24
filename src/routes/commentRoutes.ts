import { Router } from 'express';
import { listComments, getComment, addComment, editComment, removeComment } from '../controllers/commentController.js';

const router = Router();

router.get('/', listComments)
router.get('/:id', getComment)
router.post('/', addComment)
router.put('/:id', editComment)
router.delete('/:id', removeComment)

export default router
