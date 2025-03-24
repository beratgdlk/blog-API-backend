import { Request, Response } from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../models/postModel.js';

export const listPosts = async (req: Request, res: Response) => {
    try {
        const posts = await getAllPosts();
        res.json(posts)
    } catch (error: any) {
        console.error('listPosts error:', error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await getPostById(Number(id));
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "Post bulunamadı" });
        }
    } catch (error: any) {
        console.error('getPost error:', error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
}

export const addPost = async (req: Request, res: Response) => {
    try {
        const newPost = await createPost(req.body);
        res.status(201).json(newPost);
    } catch (error: any) {
        console.error('addPost error:', error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }    
}

export const editPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedPost = await updatePost(Number(id), req.body);
        res.status(200).json(updatedPost);
    } catch (error: any) {
        console.error('editPost error:', error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
}

export const removePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedPost = await deletePost(Number(id));
        res.status(200).json(deletedPost);
    } catch (error: any) {
        console.error('removePost error:', error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
}