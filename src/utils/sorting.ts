import { SORT_PARAMS } from "../constants/queryParams.js";

export const applySorting = (
    query: any, 
    sortBy?: string, 
    sortDir?: string, 
    allowedFields: string[] = []
) => {
    let field = 'created_at';
    let direction = 'desc';
    
    if (sortBy && (allowedFields.length === 0 || allowedFields.includes(sortBy))) {
        field = sortBy;
    }
    
    if (sortDir === SORT_PARAMS.ASC || sortDir === SORT_PARAMS.DESC) {
        direction = sortDir;
    }
    
    return query.orderBy(field, direction);
};