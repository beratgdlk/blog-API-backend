import { db } from '../config/database.js'

export const getAllComments = (postId?: string, commenterName?: string) => {
    const query = db('comments').where('deleted_at', null);
    
    if (postId) {
        query.where('post_id', Number(postId));
    }
    
    if (commenterName) {
        query.where('commenter_name', 'ilike', `%${commenterName}%`);
    }
    
    return query;
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