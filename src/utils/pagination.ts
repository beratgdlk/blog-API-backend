import { PAGINATION_PARAMS } from "../constants/queryParams.js";

export const applyPagination = (query: any, page?: string | number, limit?: string | number) => {
    const currentPage = page ? Number(page) : PAGINATION_PARAMS.DEFAULT_PAGE;
    const itemsPerPage = limit ? Number(limit) : PAGINATION_PARAMS.DEFAULT_LIMIT;
    
    const offset = (currentPage - 1) * itemsPerPage;
    
    return query.offset(offset).limit(itemsPerPage);
};

export const getPaginationMetadata = (total: number, page: number, limit: number) => {
    const totalPages = Math.ceil(total / limit);
    
    return {
        total,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    };
};