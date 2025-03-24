import { Router } from 'express';
import { listCategories, getCategory, addCategory, editCategory, removeCategory } from '../controllers/categoryController.js';

const router = Router();

router.get('/', listCategories)
router.get('/:id', getCategory)
router.post('/', addCategory)
router.put('/:id', editCategory)
router.delete('/:id', removeCategory)

export default router;