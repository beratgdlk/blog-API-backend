import prisma from '../config/prisma.js';

export const getAllTags = () => {
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

export const getTagById = (id: number) => {
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

export const getTagByName = (name: string) => {
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

export const createTag = (data: any) => {
    return prisma.tags.create({
        data
    });
}

export const updateTag = (id: number, data: any) => {
    return prisma.tags.update({
        where: { id },
        data
    });
}

export const deleteTag = (id: number) => {
    return prisma.tags.delete({
        where: { id }
    });
} 