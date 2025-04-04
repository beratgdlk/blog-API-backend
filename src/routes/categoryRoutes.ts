import { Router } from 'express';
import { 
    listCategories, 
    getCategory, 
    addCategory, 
    editCategory, 
    removeCategory,
    getCategoryStats
} from '../controllers/categoryController.js';

const router = Router();

// Kategori listeleme ve istatistik
router.get('/', listCategories);
router.get('/stats', getCategoryStats);

// ID'ye göre kategori işlemleri
router.get('/:id', getCategory);
router.post('/', addCategory);
router.patch('/:id', editCategory);
router.delete('/:id', removeCategory);

export default router;