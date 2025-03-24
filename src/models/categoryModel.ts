import { db } from '../config/database.js'

export const getAllCategories = () => {
    const query = db('categories')
    return query;

}

export const getCategoryById = (id:number)=>{
    return db('categories').where({ id }).first();
}

export const createCategory = (data:object)=>{
    return db('categories').insert(data).returning('*');
}

export const updateCategory = (id:number, data:object) => {
    return db('categories').where({id}).update(data).returning('*');
}

export const deleteCategory = (id:number) => {
    return db('categories').where({id}).update({deleted_at: new Date()}).returning('*');
}