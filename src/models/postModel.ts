import { db } from '../config/database.js'

export const getAllPosts = (categoryId?: string, published?: string) => {
    const query = db('posts').where('deleted_at', null);
    
    if (categoryId) {
        query.where('category_id', Number(categoryId));
    }
    
    if (published === 'true') {
        query.whereNotNull('published_at');
    } else if (published === 'false') {
        query.whereNull('published_at');
    }
    
    return query;
}

export const getPostById = (id:number)=>{
    return db('posts').where({ id , deleted_at: null }).first();
}

export const createPost = (data:object)=>{
    return db('posts').insert(data).returning('*');
}

export const updatePost = (id:number, data:object) => {
    return db('posts').where({id}).update(data).returning('*');
}

export const deletePost = (id:number) => {
    return db('posts').where({id}).update({deleted_at: new Date()}).returning('*');
}