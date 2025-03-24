import { Router } from 'express';
import { listCategories } from '../controllers/categoryController.js';

const router = Router();

router.get('/', listCategories)

export default router;