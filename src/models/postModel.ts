import prisma from '../config/prisma.js';

export const getAllPosts = (categoryId?: string, published?: string) => {
    const where: any = { deleted_at: null };
    
    if (categoryId) {
        where.category_id = Number(categoryId);
    }
    
    if (published === 'true') {
        where.published_at = { not: null };
    } else if (published === 'false') {
        where.published_at = null;
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

export const getPostById = (id: number) => {
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

export const createPost = (data: any) => {
    return prisma.posts.create({
        data,
        include: {
            categories: true
        }
    });
}

export const updatePost = (id: number, data: any) => {
    return prisma.posts.update({
        where: { id },
        data,
        include: {
            categories: true
        }
    });
}

export const deletePost = (id: number) => {
    return prisma.posts.update({
        where: { id },
        data: { deleted_at: new Date() }
    });
}

// Etiketlerle ilgili işlemler
export const addTagToPost = (postId: number, tagId: number) => {
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

export const removeTagFromPost = (postId: number, tagId: number) => {
    return prisma.postTags.deleteMany({
        where: {
            post_id: postId,
            tag_id: tagId
        }
    });
}

export const getPostsByTagId = (tagId: number) => {
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