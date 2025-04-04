import prisma from '../config/prisma.js';

export const getAllCategories = (showDeleted: string) => {
    if (showDeleted === "true") {
        return prisma.categories.findMany();
    } else if (showDeleted === "onlyDeleted") {
        return prisma.categories.findMany({
            where: {
                deleted_at: {
                    not: null
                }
            }
        });
    } else {
        return prisma.categories.findMany({
            where: {
                deleted_at: null
            }
        });
    }
}

export const getCategoryById = (id: number) => {
    return prisma.categories.findUnique({
        where: { id },
        include: { posts: true }
    });
}

export const createCategory = (data: any) => {
    return prisma.categories.create({
        data
    });
}

export const updateCategory = (id: number, data: any) => {
    return prisma.categories.update({
        where: { id },
        data
    });
}

export const deleteCategory = (id: number) => {
    return prisma.categories.update({
        where: { id },
        data: { deleted_at: new Date() }
    });
}