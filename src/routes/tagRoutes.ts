import express from 'express';
import { listTags, getTag, addTag, editTag, removeTag, getPostsByTag } from '../controllers/tagController.js';

const router = express.Router();

// Tüm etiketleri getir
router.get('/', listTags);

// Bir etiketi ID'ye göre getir 
router.get('/:id', getTag);

// Bir etiketle ilişkili tüm gönderileri getir
router.get('/:id/posts', getPostsByTag);

// Yeni etiket oluştur
router.post('/', addTag);

// Etiketi güncelle
router.put('/:id', editTag);

// Etiketi sil
router.delete('/:id', removeTag);

export default router; 