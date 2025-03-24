import { Request, Response } from 'express';
import { createComment, getAllComments, getCommentById, updateComment, deleteComment } from '../models/commentModel.js';
import { QUERY_PARAMS } from '../constants/queryParams.js';

export const listComments = async (req: Request, res: Response) => {
    try {
        const postId = req.query[QUERY_PARAMS.POST_ID] as string;
        const commenterName = req.query[QUERY_PARAMS.COMMENTER_NAME] as string;
        
        const comments = await getAllComments(postId, commenterName);
        res.status(200).json(comments);
    } catch (error: any) {
        console.error('listComments error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await getCommentById(Number(id));
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: "Comment not found" });
        }
    } catch (error: any) {
        console.error('getComment error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const addComment = async (req: Request, res: Response) => {
    try {
        const newComment = await createComment(req.body);
        res.status(201).json(newComment);
    } catch (error: any) {
        console.error('addComment error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }    
}

export const editComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedComment = await updateComment(Number(id), req.body);
        res.status(200).json(updatedComment);
    } catch (error: any) {
        console.error('editComment error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedComment = await deleteComment(Number(id));
        res.status(200).json(deletedComment);
    } catch (error: any) {
        console.error('removeComment error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}