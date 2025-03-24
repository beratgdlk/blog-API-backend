import { SORT_PARAMS } from "../constants/queryParams.js";

/**
 * Apply sorting to a database query
 * @param query Knex query object
 * @param sortBy Field to sort by
 * @param sortDir Sort direction (asc or desc)
 * @param allowedFields List of fields that are allowed to be sorted
 * @returns Updated query with sorting applied
 */
export const applySorting = (
    query: any, 
    sortBy?: string, 
    sortDir?: string, 
    allowedFields: string[] = []
) => {
    // Default sorting field and direction
    let field = 'created_at';
    let direction = 'desc';
    
    // If sort field is provided and it's in the allowed list, use it
    if (sortBy && (allowedFields.length === 0 || allowedFields.includes(sortBy))) {
        field = sortBy;
    }
    
    // Set sort direction if valid
    if (sortDir === SORT_PARAMS.ASC || sortDir === SORT_PARAMS.DESC) {
        direction = sortDir;
    }
    
    return query.orderBy(field, direction);
}; 