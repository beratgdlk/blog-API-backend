import { Request, Response } from 'express';
import { createComment, getAllComments, getCommentById, updateComment, deleteComment } from '../models/commentModel.js';

export const listComments = async (req: Request, res: Response) => {
    try {
        const comments = await getAllComments();
        res.json(comments)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "server error"});
    }
}

export const getComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await getCommentById(Number(id));
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ message: "not_found" });
        }
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: "not_found" });
    }
}

export const addComment = async (req: Request, res: Response) => {
    try {
        const newComment = await createComment(req.body);
        res.status(201).json(newComment);
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: "not_found"});
    }    
}

export const editComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedComment = await updateComment(Number(id), req.body);
        res.status(200).json(updatedComment);
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: "not_found"});
    }
}

export const removeComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedComment = await deleteComment(Number(id));
        res.status(200).json(deletedComment);
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: "not_found"});
    }
}