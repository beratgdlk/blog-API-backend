import { Request, Response } from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../models/categoryModel.js';

export const listCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}

export const getCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(Number(id));
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: "not_found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}

export const addCategory = async (req: Request, res: Response) => {
    try {
        const newCategory = await createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }    
}

export const editCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await updateCategory(Number(id), req.body);
        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}

export const removeCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await deleteCategory(Number(id));
        res.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}