import prisma from '../config/prisma.js';
import { comments } from '@prisma/client';

export interface CommentData {
    post_id?: number;
    content?: string;
    commenter_name: string;
    [key: string]: any;
}

export const getAllComments = async (postId?: string, commenterName?: string) => {
    const where: any = {};
    
    if (postId) {
        where.post_id = Number(postId);
    }
    
    if (commenterName) {
        where.commenter_name = {
            contains: commenterName,
            mode: 'insensitive'
        };
    }
    
    return prisma.comments.findMany({
        where,
        include: {
            posts: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
}

export const getCommentById = async (id: number): Promise<comments | null> => {
    return prisma.comments.findUnique({
        where: { id },
        include: {
            posts: true
        }
    });
}

export const getCommentsByPostId = async (postId: number) => {
    return prisma.comments.findMany({
        where: {
            post_id: postId
        },
        orderBy: {
            created_at: 'desc'
        }
    });
}

export const createComment = async (data: CommentData): Promise<comments> => {
    return prisma.comments.create({
        data,
        include: {
            posts: true
        }
    });
}

export const updateComment = async (id: number, data: CommentData): Promise<comments> => {
    return prisma.comments.update({
        where: { id },
        data,
        include: {
            posts: true
        }
    });
}

export const deleteComment = async (id: number): Promise<comments> => {
    return prisma.comments.delete({
        where: { id }
    });
}

export const getCommentCount = async (postId?: number): Promise<number> => {
    const where = postId ? { post_id: postId } : {};
    return prisma.comments.count({ where });
}