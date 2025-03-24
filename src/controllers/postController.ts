import { Request, Response } from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../models/postModel.js';

export const listPosts = async (req: Request, res: Response) => {
    try {
        const posts = await getAllPosts();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await getPostById(Number(id));
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "not_found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}

export const addPost = async (req: Request, res: Response) => {
    try {
        const newPost = await createPost(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }    
}

export const editPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedPost = await updatePost(Number(id), req.body);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}

export const removePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedPost = await deletePost(Number(id));
        res.status(200).json(deletedPost);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}