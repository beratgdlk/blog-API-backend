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

// Tüm etiketleri getir
router.get('/', listTags);

// Etiket istatistikleri
router.get('/stats', getTagStats);

// Popüler etiketleri getir
router.get('/popular', getPopularTagsController);

// Bir etiketi ID'ye göre getir 
router.get('/:id', getTag);

// Bir etiketle ilişkili tüm gönderileri getir
router.get('/:id/posts', getPostsByTag);

// Yeni etiket oluştur
router.post('/', addTag);

// Etiketi güncelle
router.patch('/:id', editTag);

// Etiketi sil
router.delete('/:id', removeTag);

export default router; 