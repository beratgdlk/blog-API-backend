import prisma from '../config/prisma.js';
import { tags } from '@prisma/client';

export interface TagData {
    name: string;
    description?: string;
    [key: string]: any;
}

// Tüm etiketleri getir
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

// ID'ye göre etiket getir
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

// İsme göre etiket getir
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

// Yeni etiket oluştur
export const createTag = async (data: TagData): Promise<tags> => {
    return prisma.tags.create({
        data
    });
}

// Etiketi güncelle
export const updateTag = async (id: number, data: TagData): Promise<tags> => {
    return prisma.tags.update({
        where: { id },
        data
    });
}

// Etiketi sil
export const deleteTag = async (id: number): Promise<tags> => {
    // Bu işlem ilişkili tüm postTags kayıtlarını da otomatik olarak silecek
    // çünkü modelde onDelete: Cascade tanımlandı
    return prisma.tags.delete({
        where: { id }
    });
}

// En çok kullanılan etiketleri getir
export const getPopularTags = async (limit: number = 10) => {
    // Etiketleri kullanım sayısına göre sırala
    const tagsWithCount = await prisma.tags.findMany({
        include: {
            _count: {
                select: {
                    postTags: true
                }
            }
        }
    });
    
    // Kullanım sayısına göre sırala ve limit uygula
    return tagsWithCount
        .sort((a, b) => b._count.postTags - a._count.postTags)
        .slice(0, limit);
}

// Etiketlerin toplam sayısını al
export const getTagCount = async (): Promise<number> => {
    return prisma.tags.count();
} 