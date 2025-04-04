import prisma from '../config/prisma.js';
import { tags } from '@prisma/client';

export interface TagData {
    name: string;
    description?: string;
    [key: string]: any;
}

export const getAllTags = async () => {
    return prisma.tags.findMany({
        include: {
            postTags: {
                include: {
                    post: true
                }
            }
        }
    });
}

export const getTagById = async (id: number): Promise<tags | null> => {
    return prisma.tags.findUnique({
        where: { id },
        include: {
            postTags: {
                include: {
                    post: true
                }
            }
        }
    });
}

export const getTagByName = async (name: string): Promise<tags | null> => {
    return prisma.tags.findUnique({
        where: { name },
        include: {
            postTags: {
                include: {
                    post: true
                }
            }
        }
    });
}

export const createTag = async (data: TagData): Promise<tags> => {
    return prisma.tags.create({
        data
    });
}

export const updateTag = async (id: number, data: TagData): Promise<tags> => {
    return prisma.tags.update({
        where: { id },
        data
    });
}

export const deleteTag = async (id: number): Promise<tags> => {
    return prisma.tags.delete({
        where: { id }
    });
}

export const getPopularTags = async (limit: number = 10) => {
    const tagsWithCount = await prisma.tags.findMany({
        include: {
            _count: {
                select: {
                    postTags: true
                }
            }
        }
    });
    
    return tagsWithCount
        .sort((a, b) => b._count.postTags - a._count.postTags)
        .slice(0, limit);
}

export const getTagCount = async (): Promise<number> => {
    return prisma.tags.count();
}