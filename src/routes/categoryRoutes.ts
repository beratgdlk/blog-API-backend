import express from 'express';
import { 
    listCategories, 
    getCategory, 
    addCategory, 
    editCategory, 
    removeCategory,
    getCategoryStats
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', listCategories as express.RequestHandler);
router.get('/stats', getCategoryStats as express.RequestHandler);

router.get('/:id', getCategory as express.RequestHandler);
router.post('/', addCategory as express.RequestHandler);
router.patch('/:id', editCategory as express.RequestHandler);
router.delete('/:id', removeCategory as express.RequestHandler);

export default router;