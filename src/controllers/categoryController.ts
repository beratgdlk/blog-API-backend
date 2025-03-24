import { Request, Response } from 'express';
import { getAllCategories } from '../models/categoryModel.js';

export const listCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "It was an error." });
    }
}