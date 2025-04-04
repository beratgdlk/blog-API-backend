import prisma from '../config/prisma.js';
import { categories } from '@prisma/client';

export interface CategoryData {
    name: string;
    [key: string]: any;
}

// Tüm kategorileri getir
export const getAllCategories = async (showDeleted: string) => {
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

// ID'ye göre kategori getir
export const getCategoryById = async (id: number): Promise<categories | null> => {
    return prisma.categories.findUnique({
        where: { id },
        include: { posts: true }
    });
}

// Yeni kategori oluştur
export const createCategory = async (data: CategoryData): Promise<categories> => {
    return prisma.categories.create({
        data
    });
}

// Kategori güncelle
export const updateCategory = async (id: number, data: CategoryData): Promise<categories> => {
    return prisma.categories.update({
        where: { id },
        data
    });
}

// Kategori sil (yumuşak silme)
export const deleteCategory = async (id: number): Promise<categories> => {
    return prisma.categories.update({
        where: { id },
        data: { deleted_at: new Date() }
    });
}

// Kategorilerin toplam sayısını al
export const getCategoryCount = async (includeDeleted: boolean = false): Promise<number> => {
    const where = includeDeleted ? {} : { deleted_at: null };
    return prisma.categories.count({ where });
} 