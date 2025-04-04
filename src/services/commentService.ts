import prisma from '../config/prisma.js';
import { comments } from '@prisma/client';

export interface CommentData {
    post_id?: number;
    content?: string;
    contenter_name: string;
    [key: string]: any;
}

// Tüm yorumları getir
export const getAllComments = async (postId?: string, commenterName?: string) => {
    const where: any = {};
    
    if (postId) {
        where.post_id = Number(postId);
    }
    
    if (commenterName) {
        where.contenter_name = {
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

// ID'ye göre yorum getir
export const getCommentById = async (id: number): Promise<comments | null> => {
    return prisma.comments.findUnique({
        where: { id },
        include: {
            posts: true
        }
    });
}

// Yazıya göre yorumları getir
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

// Yeni yorum oluştur
export const createComment = async (data: CommentData): Promise<comments> => {
    return prisma.comments.create({
        data,
        include: {
            posts: true
        }
    });
}

// Yorumu güncelle
export const updateComment = async (id: number, data: CommentData): Promise<comments> => {
    return prisma.comments.update({
        where: { id },
        data,
        include: {
            posts: true
        }
    });
}

// Yorumu sil
export const deleteComment = async (id: number): Promise<comments> => {
    return prisma.comments.delete({
        where: { id }
    });
}

// Yorumların toplam sayısını al
export const getCommentCount = async (postId?: number): Promise<number> => {
    const where = postId ? { post_id: postId } : {};
    return prisma.comments.count({ where });
} 