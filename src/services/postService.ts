import prisma from '../config/prisma.js';
import { posts } from '@prisma/client';

export interface PostData {
    title: string;
    content: string;
    category_id?: number;
    [key: string]: any;
}

export const getAllPosts = async (categoryId?: string, published?: string, tags?: string) => {
    const where: any = { deleted_at: null };
    
    if (categoryId) {
        where.category_id = Number(categoryId);
    }
    
    if (published === 'true') {
        where.published_at = { not: null };
    } else if (published === 'false') {
        where.published_at = null;
    }
    
    if (tags) {
        const tagIds = tags.split(',').map(id => Number(id.trim()));
        
        where.postTags = {
            some: {
                tag_id: {
                    in: tagIds
                }
            }
        };
    }
    
    return prisma.posts.findMany({
        where,
        include: {
            categories: true,
            comments: true,
            postTags: {
                include: {
                    tag: true
                }
            }
        }
    });
}

export const getPostById = async (id: number) => {
    return prisma.posts.findUnique({
        where: { id },
        include: {
            categories: true,
            comments: true,
            postTags: {
                include: {
                    tag: true
                }
            }
        }
    });
}

export const createPost = async (data: PostData) => {
    return prisma.posts.create({
        data,
        include: {
            categories: true
        }
    });
}

export const updatePost = async (id: number, data: PostData) => {
    return prisma.posts.update({
        where: { id },
        data,
        include: {
            categories: true
        }
    });
}

export const deletePost = async (id: number) => {
    return prisma.posts.update({
        where: { id },
        data: { deleted_at: new Date() }
    });
}

export const publishPost = async (id: number) => {
    return prisma.posts.update({
        where: { id },
        data: { published_at: new Date() }
    });
}

export const unpublishPost = async (id: number) => {
    return prisma.posts.update({
        where: { id },
        data: { published_at: null }
    });
}

export const addTagToPost = async (postId: number, tagId: number) => {
    const existingRelation = await prisma.postTags.findFirst({
        where: {
            post_id: postId,
            tag_id: tagId
        }
    });

    if (existingRelation) {
        throw new Error('Bu etiket zaten bu yazıya eklenmiş');
    }

    return prisma.postTags.create({
        data: {
            post_id: postId,
            tag_id: tagId
        },
        include: {
            tag: true
        }
    });
}

export const removeTagFromPost = async (postId: number, tagId: number) => {
    return prisma.postTags.deleteMany({
        where: {
            post_id: postId,
            tag_id: tagId
        }
    });
}

export const getPostsByTagId = async (tagId: number) => {
    return prisma.posts.findMany({
        where: {
            deleted_at: null,
            postTags: {
                some: {
                    tag_id: tagId
                }
            }
        },
        include: {
            categories: true,
            postTags: {
                include: {
                    tag: true
                }
            }
        }
    });
}

export const getPostCount = async (includeDeleted: boolean = false): Promise<number> => {
    const where = includeDeleted ? {} : { deleted_at: null };
    return prisma.posts.count({ where });
}