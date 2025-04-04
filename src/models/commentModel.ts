import prisma from '../config/prisma.js';

export const getAllComments = (postId?: string, commenterName?: string) => {
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
        }
    });
}

export const getCommentById = (id: number) => {
    return prisma.comments.findUnique({
        where: { id },
        include: {
            posts: true
        }
    });
}

export const createComment = (data: any) => {
    return prisma.comments.create({
        data,
        include: {
            posts: true
        }
    });
}

export const updateComment = (id: number, data: any) => {
    return prisma.comments.update({
        where: { id },
        data,
        include: {
            posts: true
        }
    });
}

export const deleteComment = (id: number) => {
    return prisma.comments.delete({
        where: { id }
    });
}