import { Request, Response } from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getCategoryCount } from '../services/categoryService.js';
import { QUERY_PARAMS } from '../constants/queryParams.js';

export const listCategories = async (req: Request, res: Response) => {
    try {
        const showDeleted = req.query[QUERY_PARAMS.SHOW_DELETED] as string;
        const categories = await getAllCategories(showDeleted);
        res.status(200).json(categories);
    } catch (error: any) {
        console.error('listCategories error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(Number(id));
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error: any) {
        console.error('getCategory error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const addCategory = async (req: Request, res: Response) => {
    try {
        const newCategory = await createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error: any) {
        console.error('addCategory error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }    
}

export const editCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await updateCategory(Number(id), req.body);
        res.status(200).json(updated);
    } catch (error: any) {
        console.error('editCategory error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await deleteCategory(Number(id));
        res.status(200).json(deleted);
    } catch (error: any) {
        console.error('removeCategory error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// İstatistikler için yeni endpoint
export const getCategoryStats = async (req: Request, res: Response) => {
    try {
        const total = await getCategoryCount();
        const totalWithDeleted = await getCategoryCount(true);
        const deletedCount = totalWithDeleted - total;
        
        res.status(200).json({
            total,
            active: total,
            deleted: deletedCount
        });
    } catch (error: any) {
        console.error('getCategoryStats error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}