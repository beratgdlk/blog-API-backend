import { db } from '../config/database.js'

export const getAllCategories = () => {
    const query = db('categories')
    return query;
    
}