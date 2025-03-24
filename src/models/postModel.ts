import { db } from '../config/database.js'

export const getAllPosts = () => {
    const query = db('posts')
    return query.where('deleted_at',null);
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