import { Request, Response } from 'express';
import { 
    getAllPosts, 
    getPostById, 
    createPost, 
    updatePost, 
    deletePost, 
    addTagToPost, 
    removeTagFromPost,
    publishPost,
    unpublishPost,
    getPostsByTagId,
    getPostCount
} from '../services/postService.js';
import { QUERY_PARAMS } from '../constants/queryParams.js';

export const listPosts = async (req: Request, res: Response) => {
    try {
        const categoryId = req.query[QUERY_PARAMS.CATEGORY_ID] as string;
        const published = req.query[QUERY_PARAMS.PUBLISHED] as string;
        const posts = await getAllPosts(categoryId, published);
        res.status(200).json(posts);
    } catch (error: any) {
        console.error('listPosts error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await getPostById(Number(id));
        
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error: any) {
        console.error('getPost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const addPost = async (req: Request, res: Response) => {
    try {
        const newPost = await createPost(req.body);
        res.status(201).json(newPost);
    } catch (error: any) {
        console.error('addPost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }    
}

export const editPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await updatePost(Number(id), req.body);
        res.status(200).json(updated);
    } catch (error: any) {
        console.error('editPost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await deletePost(Number(id));
        res.status(200).json(deleted);
    } catch (error: any) {
        console.error('removePost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Etiketleme işlevleri
export const addTagToPostController = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.params;
        const taggedPost = await addTagToPost(Number(postId), Number(tagId));
        res.status(201).json(taggedPost);
    } catch (error: any) {
        console.error('addTagToPost error:', error);
        if (error.message === 'Bu etiket zaten bu yazıya eklenmiş') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeTagFromPostController = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.params;
        await removeTagFromPost(Number(postId), Number(tagId));
        res.status(200).json({ message: "Tag removed from post successfully" });
    } catch (error: any) {
        console.error('removeTagFromPost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Yazı yayınlama işlevi
export const publishPostController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const published = await publishPost(Number(id));
        res.status(200).json(published);
    } catch (error: any) {
        console.error('publishPost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Yazı yayından kaldırma işlevi
export const unpublishPostController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const unpublished = await unpublishPost(Number(id));
        res.status(200).json(unpublished);
    } catch (error: any) {
        console.error('unpublishPost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Etikete göre yazıları getir
export const getPostsByTag = async (req: Request, res: Response) => {
    try {
        const { tagId } = req.params;
        const posts = await getPostsByTagId(Number(tagId));
        res.status(200).json(posts);
    } catch (error: any) {
        console.error('getPostsByTag error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Yazı istatistikleri
export const getPostStats = async (req: Request, res: Response) => {
    try {
        const total = await getPostCount();
        const totalWithDeleted = await getPostCount(true);
        const deletedCount = totalWithDeleted - total;
        
        res.status(200).json({
            total,
            active: total,
            deleted: deletedCount
        });
    } catch (error: any) {
        console.error('getPostStats error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}