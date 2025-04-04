import { Request, Response } from 'express';
import { 
    getAllTags, 
    getTagById, 
    createTag, 
    updateTag, 
    deleteTag, 
    getTagByName,
    getPopularTags,
    getTagCount
} from '../services/tagService.js';
import { getPostsByTagId } from '../services/postService.js';

export const listTags = async (req: Request, res: Response) => {
    try {
        const tags = await getAllTags();
        res.status(200).json(tags);
    } catch (error: any) {
        console.error('listTags error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tag = await getTagById(Number(id));
        
        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: "Tag not found" });
        }
    } catch (error: any) {
        console.error('getTag error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getPostsByTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const posts = await getPostsByTagId(Number(id));
        res.status(200).json(posts);
    } catch (error: any) {
        console.error('getPostsByTag error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const addTag = async (req: Request, res: Response) => {
    try {
        // Etiket adının benzersiz olduğunu kontrol et
        const existingTag = await getTagByName(req.body.name);
        if (existingTag) {
            return res.status(400).json({ message: "Tag with this name already exists" });
        }
        
        const newTag = await createTag(req.body);
        res.status(201).json(newTag);
    } catch (error: any) {
        console.error('addTag error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }    
}

export const editTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // Eğer isim değiştiriliyorsa, yeni ismin kullanılabilir olduğunu kontrol et
        if (req.body.name) {
            const existingTag = await getTagByName(req.body.name);
            if (existingTag && existingTag.id !== Number(id)) {
                return res.status(400).json({ message: "Tag with this name already exists" });
            }
        }
        
        const updated = await updateTag(Number(id), req.body);
        res.status(200).json(updated);
    } catch (error: any) {
        console.error('editTag error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await deleteTag(Number(id));
        res.status(200).json(deleted);
    } catch (error: any) {
        console.error('removeTag error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Popüler etiketleri getir
export const getPopularTagsController = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const popularTags = await getPopularTags(limit);
        res.status(200).json(popularTags);
    } catch (error: any) {
        console.error('getPopularTags error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Etiket istatistikleri
export const getTagStats = async (req: Request, res: Response) => {
    try {
        const total = await getTagCount();
        
        res.status(200).json({
            total
        });
    } catch (error: any) {
        console.error('getTagStats error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
} 