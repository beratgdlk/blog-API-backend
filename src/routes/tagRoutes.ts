import express from 'express';
import { 
    listTags, 
    getTag, 
    addTag, 
    editTag, 
    removeTag, 
    getPostsByTag,
    getPopularTagsController,
    getTagStats
} from '../controllers/tagController.js';

const router = express.Router();

router.get('/', listTags as express.RequestHandler);

router.get('/stats', getTagStats as express.RequestHandler);

router.get('/popular', getPopularTagsController as express.RequestHandler);

router.get('/:id', getTag as express.RequestHandler);

router.get('/:id/posts', getPostsByTag as express.RequestHandler);

router.post('/', addTag as express.RequestHandler);

router.patch('/:id', editTag as express.RequestHandler);

router.delete('/:id', removeTag as express.RequestHandler);

export default router;