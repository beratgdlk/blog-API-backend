import { Request, Response } from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../models/postModel.js';
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
        const updatedPost = await updatePost(Number(id), req.body);
        res.status(200).json(updatedPost);
    } catch (error: any) {
        console.error('editPost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedPost = await deletePost(Number(id));
        res.status(200).json(deletedPost);
    } catch (error: any) {
        console.error('removePost error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}