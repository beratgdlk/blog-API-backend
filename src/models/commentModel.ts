import { db } from '../config/database.js'

export const getAllComments = () => {
    const query = db('comments')
    return query.where('deleted_at',null);
}

export const getCommentById = (id:number)=>{
    return db('comments').where({ id , deleted_at: null }).first();
}

export const createComment = (data:object)=>{
    return db('comments').insert(data).returning('*');
}

export const updateComment = (id:number, data:object) => {
    return db('comments').where({id}).update(data).returning('*');
}

export const deleteComment = (id:number) => {
    return db('comments').where({id}).delete();
}